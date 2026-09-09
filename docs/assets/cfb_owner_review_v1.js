
(function(){
  const data = JSON.parse(document.getElementById('owner-review-data').textContent);
  const key = `sportsfun.cfb.ownerReview.${data.season}.WK${String(data.week).padStart(2,'0')}.feedback`;
  const cards = Array.from(document.querySelectorAll('[data-game-id].owner-game-card'));
  const controls = document.querySelector('[data-owner-controls]');
  const drawer = document.querySelector('[data-feedback-drawer]');
  const form = document.querySelector('[data-feedback-form]');
  let feedback = loadFeedback();
  function loadFeedback(){ try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch(e){ return []; } }
  function saveFeedback(){ localStorage.setItem(key, JSON.stringify(feedback)); updateFeedbackPills(); }
  function updateFeedbackPills(){
    const counts = {};
    feedback.forEach(r => counts[r.game_id]=(counts[r.game_id]||0)+1);
    cards.forEach(card => {
      const count = counts[card.dataset.gameId] || Number(card.dataset.initialFeedbackCount || 0);
      card.dataset.feedbackStatus = count ? 'reviewed' : 'not_reviewed';
      const pill = card.querySelector('[data-feedback-pill]');
      if (pill) pill.textContent = count ? `reviewed (${count})` : 'not reviewed';
    });
    const total = document.querySelector('[data-owner-feedback-total]');
    if (total) total.textContent = String(feedback.length + data.feedback.length);
    applyFilters();
  }
  function value(name){ const el = controls.querySelector(`[data-filter="${name}"]`); return el ? el.value : 'all'; }
  function visible(card){
    const team = value('team').toLowerCase();
    const spreadMax = Number(value('model-spread-range') || 45);
    const disagreementMin = Number(value('disagreement-size') || 0);
    const tests = [
      value('conference') === 'all' || card.dataset.conference === value('conference'),
      !team || team === 'all' || card.dataset.teams.toLowerCase().includes(team),
      value('game-date') === 'all' || card.dataset.date === value('game-date'),
      value('kickoff-window') === 'all' || card.dataset.window === value('kickoff-window'),
      value('uncertainty') === 'all' || card.dataset.uncertainty === value('uncertainty'),
      value('data-quality') === 'all' || card.dataset.quality === value('data-quality'),
      value('fbs-fcs') === 'all' || card.dataset.fbsFcs === value('fbs-fcs'),
      value('feedback-status') === 'all' || card.dataset.feedbackStatus === value('feedback-status'),
      Number(card.dataset.modelSpread || 0) <= spreadMax,
      Number(card.dataset.disagreement || 0) >= disagreementMin,
      marketVisible(card),
    ];
    return tests.every(Boolean);
  }
  function marketVisible(card){
    const v = value('market-availability');
    if (v === 'all') return true;
    if (v === 'market_available') return card.dataset.marketAvailable === 'true';
    if (v === 'market_missing') return card.dataset.marketAvailable !== 'true';
    if (v === 'spread_missing') return card.dataset.marketSpreadAvailable !== 'true';
    if (v === 'total_missing') return card.dataset.marketTotalAvailable !== 'true';
    return true;
  }
  function applyFilters(){
    cards.forEach(card => card.classList.toggle('hidden-by-filter', !visible(card)));
    sortCards();
    const count = cards.filter(card => !card.classList.contains('hidden-by-filter')).length;
    const visibleCount = document.querySelector('[data-visible-count]');
    if (visibleCount) visibleCount.textContent = String(count);
  }
  function sortCards(){
    const list = document.querySelector('.owner-game-list');
    const sorted = cards.slice().sort((a,b)=>{
      const mode = value('sort');
      if (mode === 'largest_model_favorite') return Number(b.dataset.modelSpread)-Number(a.dataset.modelSpread);
      if (mode === 'closest_projected_game') return Number(a.dataset.modelSpread)-Number(b.dataset.modelSpread);
      if (mode === 'highest_projected_total') return Number(b.dataset.modelTotal)-Number(a.dataset.modelTotal);
      if (mode === 'lowest_projected_total') return Number(a.dataset.modelTotal)-Number(b.dataset.modelTotal);
      if (mode === 'largest_model_market_disagreement') return Number(b.dataset.disagreement)-Number(a.dataset.disagreement);
      if (mode === 'highest_uncertainty') return ({high:0,medium:1,low:2}[a.dataset.uncertainty]??3)-({high:0,medium:1,low:2}[b.dataset.uncertainty]??3);
      if (mode === 'teams_alphabetically') return (a.dataset.away+a.dataset.home).localeCompare(b.dataset.away+b.dataset.home);
      return (a.id).localeCompare(b.id);
    });
    sorted.forEach(card => list.appendChild(card));
  }
  controls.addEventListener('input', e => {
    if (e.target.matches('[data-filter="model-spread-range"]')) document.querySelector('[data-range-label]').textContent = e.target.value;
    if (e.target.matches('[data-filter="disagreement-size"]')) document.querySelector('[data-disagreement-label]').textContent = e.target.value;
    applyFilters();
  });
  document.querySelector('[data-reset-filters]').addEventListener('click',()=>{
    controls.querySelectorAll('select').forEach(s=>s.selectedIndex=0);
    controls.querySelector('[data-filter="model-spread-range"]').value=45;
    controls.querySelector('[data-filter="disagreement-size"]').value=0;
    document.querySelector('[data-range-label]').textContent='45';
    document.querySelector('[data-disagreement-label]').textContent='0';
    applyFilters();
  });
  document.querySelectorAll('[data-open-feedback]').forEach(btn=>btn.addEventListener('click',()=>{
    const game = data.games.find(g=>g.game_id===btn.dataset.gameId);
    form.game_id.value = game.game_id;
    document.querySelector('[data-feedback-game-title]').textContent = `${game.away_team} at ${game.home_team}`;
    drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false');
  }));
  document.querySelector('[data-close-feedback]').addEventListener('click',()=>{drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');});
  form.addEventListener('submit', e => {
    e.preventDefault();
    const game = data.games.find(g=>g.game_id===form.game_id.value);
    const now = new Date().toISOString();
    const existing = feedback.find(r=>r.game_id===game.game_id && r.category===form.category.value && r.note===form.note.value);
    const record = existing || {
      feedback_id: `owner-${data.season}-WK${String(data.week).padStart(2,'0')}-${game.game_id}-${Date.now()}`,
      created_timestamp: now,
      history: []
    };
    if (existing) record.history.push({updated_timestamp: record.updated_timestamp || record.created_timestamp, note: record.note, status: record.status});
    Object.assign(record, {
      season:data.season, week:data.week, game_id:game.game_id, team_ids:game.team_ids,
      category:form.category.value, owner_confidence:form.owner_confidence.value, note:form.note.value,
      updated_timestamp:now, workspace_run_id:data.run_id, model_id:data.model_id,
      projection_digest:game.projection_digest, market_snapshot_id:data.market_snapshot_id || '',
      status:form.status.value, resolution_note:form.resolution_note.value,
      downstream_eligibility:'owner_review_required'
    });
    if (!existing) feedback.push(record);
    saveFeedback(); form.reset(); drawer.classList.remove('open');
  });
  document.querySelector('[data-export-feedback]').addEventListener('click',()=>{
    const blob = new Blob([JSON.stringify({schema_version:'cfb-owner-feedback-export-v1', season:data.season, week:data.week, exported_at:new Date().toISOString(), records:feedback}, null, 2)], {type:'application/json'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `cfb_owner_feedback_${data.season}_WK${String(data.week).padStart(2,'0')}.json`; a.click(); URL.revokeObjectURL(a.href);
  });
  document.querySelector('[data-import-feedback]').addEventListener('change', async e=>{
    const file = e.target.files[0]; if (!file) return;
    const imported = JSON.parse(await file.text());
    (imported.records || []).forEach(r=>{ if(!feedback.find(x=>x.feedback_id===r.feedback_id)) feedback.push(r); });
    saveFeedback();
  });
  document.querySelector('[data-clear-local-feedback]').addEventListener('click',()=>{ feedback=[]; saveFeedback(); });
  updateFeedbackPills();
})();
