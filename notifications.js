const notifications = [
  { title: 'RRB NTPC Graduate Posts', organization: 'Railway Recruitment Board', stream: 'Any Graduate', category: 'Government', date: 'Today', closing: '21 days left', source: 'RRB Apply', url: 'https://www.rrbapply.gov.in/' },
  { title: 'Nursing Officer — NORCET', organization: 'AIIMS India', stream: 'B.Sc Nursing', category: 'Government', date: 'Today', closing: '24 days left', source: 'AIIMS Exams', url: 'https://www.aiimsexams.ac.in/' },
  { title: 'RBI Assistant', organization: 'Reserve Bank of India', stream: 'B.Com / Any Graduate', category: 'Government', date: 'Yesterday', closing: '30 days left', source: 'RBI', url: 'https://www.rbi.org.in/' },
  { title: 'NABARD Grade A — Agriculture', organization: 'NABARD', stream: 'B.Sc Agriculture', category: 'Government', date: 'Yesterday', closing: '18 days left', source: 'NABARD', url: 'https://www.nabard.org/' },
  { title: 'Graduate Software Engineer', organization: 'Technology employer', stream: 'B.Tech', category: 'Private', date: 'Today', closing: 'Open until filled', source: 'Hiring portal', url: 'https://www.naukri.com/' },
];
const list = document.querySelector('#notificationList');
document.querySelector('#notificationCount').textContent = notifications.length;
document.querySelector('#lastChecked').textContent = `Last checked ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
const alerts = JSON.parse(localStorage.getItem('searchMeJobAlerts') || 'null');
document.querySelector('#alertStatus').textContent = alerts?.enabled === false ? 'Paused — turn alerts on to receive daily reminders.' : 'Active — matching jobs are checked daily at 9:00 AM.';
list.innerHTML = notifications.map((item) => `<article class="notification-row"><div class="notification-mark">${item.organization.slice(0, 3).toUpperCase()}</div><div class="notification-copy"><div class="notification-title"><h3>${item.title}</h3><span class="${item.date === 'Today' ? 'new-badge' : 'date-badge'}">${item.date}</span></div><p>${item.organization} · ${item.category}</p><div class="notification-meta"><span>${item.stream}</span><span>${item.closing}</span><span>Source: ${item.source}</span></div><a href="${item.url}" target="_blank" rel="noopener noreferrer">View official notification / portal ↗</a></div></article>`).join('');
