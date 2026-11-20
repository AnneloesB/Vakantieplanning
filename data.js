// Vakantiegegevens team — gedeeld door index.html en mail.html
const people = [
  { name: 'Greet',      periods: [{ start: '2026-05-29', end: '2026-06-06' }, { start: '2026-08-03', end: '2026-08-21' }] },
  { name: 'Denise',     periods: [{ start: '2026-06-15', end: '2026-06-19' }, { start: '2026-07-13', end: '2026-07-27' }] },
  { name: 'Marieke',    periods: [{ start: '2026-06-26', end: '2026-07-11' }] },
  { name: 'Michelle',   periods: [{ start: '2026-07-20', end: '2026-08-23' }, { start: '2026-11-02', end: '2026-11-08' }] },
  { name: 'Annemarije', periods: [{ start: '2026-07-27', end: '2026-08-25' }, { start: '2026-09-21', end: '2026-09-25' }, { start: '2026-10-19', end: '2026-10-23' }] },
  { name: 'Kirsten',    periods: [{ start: '2026-07-07', end: '2026-07-31', color: '#999999' }, { start: '2026-07-31', end: '2026-08-28' }] },
  { name: 'Lonneke',    periods: [{ start: '2026-08-03', end: '2026-08-19' }, { start: '2026-10-22', end: '2026-10-27' }] },
  { name: 'Anneloes',   periods: [{ start: '2026-08-24', end: '2026-09-07' }, { start: '2026-11-26', end: '2026-11-30', note: '26 nov vanaf 12:00' }, { start: '2026-12-23', end: '2026-12-31' }] },
  { name: 'Mirjam',     periods: [{ start: '2026-10-17', end: '2026-10-24' }] },
  { name: 'Willemijn',  periods: [{ start: '2026-10-15', end: '2026-10-25' }] },
  { name: 'Siep',       periods: [{ start: '2026-10-10', end: '2026-10-18' }] },
  { name: 'Marco',      periods: [] },
  { name: 'Anouk',      periods: [{ start: '2026-10-26', end: '2026-11-12' }] },
];

function fmt(d) { return d.getDate() + ' ' + d.toLocaleString('nl-NL', { month: 'short' }); }
function parseDate(s) { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); }

// mailto-link met het vakantieoverzicht (gebruikt door de knop "Mail vakantie" en door mail.html)
function buildMailLink() {
  const sortedPeople = [...people].sort((a, b) => a.name.localeCompare(b.name, 'nl'));
  const lines = sortedPeople
    .filter(p => p.periods.length > 0)
    .map(p => `${p.name}: ${p.periods.map(pd => (pd.start === pd.end ? fmt(parseDate(pd.start)) : fmt(parseDate(pd.start)) + ' – ' + fmt(parseDate(pd.end))) + (pd.note ? ' (' + pd.note + ')' : '') + (pd.tentative ? ' (onder voorbehoud)' : '')).join(', ')}`);
  const subject = encodeURIComponent('Vakantieoverzicht team 2026');
  const body = encodeURIComponent(lines.join('\n'));
  return `mailto:anneloes.bork@tpz-midden.nl?subject=${subject}&body=${body}`;
}
