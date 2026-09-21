const $ = (selector) => document.querySelector(selector);
const toast = $('#toast');
const profileModal = $('#profileModal');
const loginModal = $('#loginModal');
const applicationModal = $('#applicationModal');
let loginMobile = '';
let pendingRegistration = false;

function showDashboard() {
  $('#welcomeGate').hidden = true;
  $('#dashboardShell').hidden = false;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 3200);
}

function updateProfileVerification(profile) {
  const verified = Boolean(profile?.photo && profile?.resume);
  $('#verifiedProfileMessage').hidden = !verified;
  if (verified) {
    $('#profileButton').textContent = 'Edit profile';
    $('#profileButton').append(' →');
    document.querySelector('.profile-mini small').textContent = '100% verified';
  }
  if (profile?.photoData) {
    $('#avatar').innerHTML = `<img src="${profile.photoData}" alt="Your profile photo">`;
  }
}

function filterJobs(query = '', type = 'all', stream = $('#streamInput')?.value || '') {
  const normalized = query.trim().toLowerCase();
  let visible = 0;
  document.querySelectorAll('.job-card').forEach((job) => {
    const matchesType = type === 'all' || job.dataset.type === type;
    const matchesQuery = !normalized || job.dataset.search.includes(normalized);
    const matchesStream = !stream || job.dataset.search.includes(stream);
    job.hidden = !(matchesType && matchesQuery && matchesStream);
    if (!job.hidden) visible += 1;
  });
  $('#emptyState').hidden = visible !== 0;
}

document.querySelectorAll('.nav-item[data-view]').forEach((item) => item.addEventListener('click', () => {
  document.querySelectorAll('.nav-item').forEach((nav) => nav.classList.remove('active'));
  item.classList.add('active');
  $('#currentView').textContent = item.textContent.replace(/\d+/g, '').trim();
  if (item.dataset.view === 'matches') document.querySelector('.panel').scrollIntoView({ behavior: 'smooth' });
  showToast(`${item.textContent.replace(/\d+/g, '').trim()} view selected`);
}));

$('#searchForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const query = $('#keywordInput').value.trim();
  const stream = document.querySelector('input[name="dashboardStream"]:checked')?.value || '';
  const destination = new URL('jobs.html', window.location.href);
  if (query) destination.searchParams.set('q', query);
  if (stream) destination.searchParams.set('stream', stream);
  window.location.href = destination.href;
});
document.querySelectorAll('.quick-searches button').forEach((button) => button.addEventListener('click', () => {
  $('#keywordInput').value = button.dataset.query;
  $('#searchForm').requestSubmit();
}));
document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach((filter) => filter.classList.remove('active'));
  button.classList.add('active');
  filterJobs($('#keywordInput').value, button.dataset.filter);
}));
if ($('#streamInput')) {
  $('#streamInput').addEventListener('change', () => {
    const stream = $('#streamInput').value;
    if (stream) {
      window.location.href = `jobs.html?stream=${encodeURIComponent(stream)}`;
      return;
    }
    filterJobs($('#keywordInput').value, 'all', '');
    showToast('Showing opportunities across all streams.');
  });
}
document.querySelectorAll('input[name="dashboardStream"]').forEach((radio) => radio.addEventListener('change', () => {
  if (radio.checked && radio.value) {
    if ($('#streamInput')) $('#streamInput').value = radio.value;
    showToast(`${radio.nextSibling.textContent.trim()} selected. Search when ready.`);
  }
}));
document.querySelectorAll('.save-job').forEach((button) => button.addEventListener('click', () => {
  button.classList.toggle('saved');
  button.textContent = button.classList.contains('saved') ? '♥' : '♡';
  const count = document.querySelectorAll('.save-job.saved').length + 5;
  $('#savedCount').textContent = String(count).padStart(2, '0');
  showToast(button.classList.contains('saved') ? 'Job saved to your shortlist' : 'Job removed from shortlist');
}));

function openModal(modal) {
  modal.hidden = false;
  modal.querySelector('input')?.focus();
}
const otpInputs = document.querySelectorAll('.otp-digit');
otpInputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/\D/g, '').slice(-1);
    if (input.value && index < otpInputs.length - 1) otpInputs[index + 1].focus();
  });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace' && !input.value && index > 0) otpInputs[index - 1].focus();
  });
  input.addEventListener('paste', (event) => {
    event.preventDefault();
    const digits = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, otpInputs.length);
    digits.split('').forEach((digit, digitIndex) => { otpInputs[digitIndex].value = digit; });
    otpInputs[Math.min(digits.length, otpInputs.length) - 1]?.focus();
  });
});
function closeModal(modal) { modal.hidden = true; }
function openProfileEditor() {
  const profile = JSON.parse(localStorage.getItem('searchMeProfile') || 'null');
  const form = $('#profileForm');
  if (profile) {
    form.elements.name.value = profile.name || '';
    form.elements.mobile.value = profile.mobile || '';
    form.elements.course.value = profile.course || 'B.Tech';
  }
  const hasPhoto = Boolean(profile?.photo);
  const hasResume = Boolean(profile?.resume);
  form.elements.photo.required = true;
  form.elements.resume.required = !hasResume;
  $('#photoHint').textContent = hasPhoto ? 'Select a JPG or PNG photo again to confirm your profile photo.' : 'Select a JPG or PNG photo. This field is required.';
  $('#resumeHint').textContent = hasResume ? 'Leave blank to keep your current resume, or choose a new PDF.' : 'Required for personalized matches and applications.';
  $('#profilePhotoPreview').hidden = !profile?.photoData;
  if (profile?.photoData) $('#profilePhotoImage').src = profile.photoData;
  openModal(profileModal);
}
$('#profileForm input[name="photo"]').addEventListener('change', (event) => {
  const photo = event.currentTarget.files[0];
  if (!photo || !photo.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = () => {
    $('#profilePhotoImage').src = reader.result;
    $('#profilePhotoPreview').hidden = false;
    $('#profilePhotoPreview span').textContent = 'Selected photo';
  };
  reader.readAsDataURL(photo);
});
$('#changePhotoButton').addEventListener('click', () => $('#profileForm input[name="photo"]').click());
$('#profileButton').addEventListener('click', openProfileEditor);
$('#editProfileMini').addEventListener('click', openProfileEditor);
$('#editPhotoButton').addEventListener('click', openProfileEditor);
$('#editPhotoLink').addEventListener('click', openProfileEditor);
$('#editProfile')?.addEventListener('click', openProfileEditor);
$('#closeModal').addEventListener('click', () => closeModal(profileModal));
$('#loginButton').addEventListener('click', () => {
  pendingRegistration = false;
  $('#phoneStep').hidden = false;
  $('#otpStep').hidden = true;
  $('#loginDescription').textContent = 'Use your mobile number to access saved jobs and applications.';
  $('#loginForm').reset();
  loginMobile = '';
  openModal(loginModal);
});
$('#welcomeLoginButton').addEventListener('click', () => {
  pendingRegistration = false;
  $('#phoneStep').hidden = false;
  $('#otpStep').hidden = true;
  $('#loginDescription').textContent = 'Use your mobile number to access your Search Me dashboard.';
  $('#loginForm').reset();
  loginMobile = '';
  openModal(loginModal);
});
$('#closeLoginModal').addEventListener('click', () => closeModal(loginModal));
$('#closeApplicationModal').addEventListener('click', () => closeModal(applicationModal));
[profileModal, loginModal].forEach((modal) => modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(modal); }));
applicationModal.addEventListener('click', (event) => { if (event.target === applicationModal) closeModal(applicationModal); });
$('#notificationButton').addEventListener('click', () => showToast('You have 4 new job matches and 1 deadline reminder.'));
$('.all-deadlines').addEventListener('click', () => showToast('Showing government opportunities closing this week.'));
document.querySelectorAll('.apply-job').forEach((button) => button.addEventListener('click', () => {
  window.open(button.dataset.url, '_blank', 'noopener,noreferrer');
  showToast('Opening the official application portal. Search Me does not bypass portal security.');
}));
document.querySelectorAll('.apply-job').forEach((button) => {
  const jobMain = button.closest('.job-main');
  if (jobMain && !jobMain.querySelector('.portal-source')) {
    const source = document.createElement('p');
    source.className = 'portal-source';
    source.textContent = `Official destination: ${new URL(button.dataset.url).hostname.replace(/^www\./, '')}`;
    jobMain.insertBefore(source, button);
  }
});

$('#applicationForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  try {
    const response = await fetch('/api/applications/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Unable to submit application.');
    closeModal(applicationModal);
    form.reset();
    showToast(`Application submitted for ${data.job}. Track it in Applications.`);
  } catch (error) { showToast(error.message); }
});

$('#profileForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const currentProfile = JSON.parse(localStorage.getItem('searchMeProfile') || 'null');
  const photo = formData.get('photo');
  const resume = formData.get('resume');
  if (!(photo instanceof File) || !photo.name || !photo.type.startsWith('image/')) {
    showToast('Please upload a JPG or PNG profile photo.');
    return;
  }
  if (!(resume instanceof File) || !resume.name) {
    if (currentProfile?.resume) formData.set('resume', currentProfile.resume);
    else {
      showToast('Please upload your resume PDF before registering.');
      return;
    }
  }
  if (resume instanceof File && resume.name && resume.type !== 'application/pdf' && !resume.name.toLowerCase().endsWith('.pdf')) {
    showToast('Please upload your resume as a PDF file.');
    return;
  }
  const data = { ...currentProfile, ...Object.fromEntries(formData) };
  data.photo = photo?.name || currentProfile.photo;
  data.resume = resume?.name || currentProfile.resume;
  try {
    if (!(photo instanceof File) || !photo.name) {
      data.photoData = currentProfile.photoData;
    } else {
    data.photoData = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Unable to read your profile photo.'));
      reader.readAsDataURL(photo);
    });
    }
  } catch (error) {
    showToast(error.message);
    return;
  }
  localStorage.setItem('searchMeProfile', JSON.stringify(data));
  $('#profileName').textContent = data.name;
  $('#heroName').textContent = data.name.split(' ')[0];
  $('#avatar').textContent = data.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();
  closeModal(profileModal);
  updateProfileVerification(data);
  showToast('Profile verified successfully at 100%.');
});

$('#startRegistrationForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  localStorage.setItem('searchMeProfile', JSON.stringify(data));
  pendingRegistration = true;
  loginMobile = data.mobile;
  $('#loginForm').reset();
  $('#loginForm').elements.mobile.value = loginMobile;
  $('#phoneStep').hidden = false;
  $('#otpStep').hidden = true;
  $('#loginDescription').textContent = 'Your account is ready. Verify your mobile number to open the dashboard.';
  openModal(loginModal);
  showToast('Details saved. Click Send OTP to verify your registration.');
});

async function requestOtp() {
  const response = await fetch('/api/auth/request-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mobile: loginMobile }) });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Unable to send OTP');
  $('#phoneStep').hidden = true;
  $('#otpStep').hidden = false;
  $('#loginDescription').textContent = `We sent a one-time code to ${loginMobile}.`;
  $('#otpHint').textContent = result.demoOtp ? `Local demo OTP: ${result.demoOtp}` : 'The code expires in 5 minutes.';
  otpInputs[0]?.focus();
}
$('#loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  try {
    if (!$('#phoneStep').hidden) {
      loginMobile = form.elements.mobile.value.trim();
      await requestOtp();
      showToast('OTP generated successfully.');
    } else {
      const otp = Array.from(otpInputs).map((input) => input.value).join('');
      if (otp.length !== 6) throw new Error('Enter all 6 OTP digits.');
      const response = await fetch('/api/auth/verify-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mobile: loginMobile, otp }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Invalid OTP');
      localStorage.setItem('searchMeAuth', JSON.stringify({ mobile: loginMobile, token: result.token }));
      closeModal(loginModal);
      $('#loginButton').textContent = 'Logged in';
      showDashboard();
      showToast(pendingRegistration ? 'Registration successful! Welcome to Search Me.' : 'Login successful. Your saved jobs are ready.');
      pendingRegistration = false;
    }
  } catch (error) { showToast(error.message); }
});
$('#resendOtp').addEventListener('click', async () => { try { await requestOtp(); showToast('A new OTP was generated.'); } catch (error) { showToast(error.message); } });

const savedProfile = JSON.parse(localStorage.getItem('searchMeProfile') || 'null');
if (savedProfile?.name) {
  $('#profileName').textContent = savedProfile.name;
  $('#heroName').textContent = savedProfile.name.split(' ')[0];
  $('#avatar').textContent = savedProfile.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();
}
updateProfileVerification(savedProfile);
if (localStorage.getItem('searchMeAuth')) showDashboard();
if (localStorage.getItem('searchMeJobAlerts')) {
  const alertSettings = JSON.parse(localStorage.getItem('searchMeJobAlerts'));
  if (alertSettings.enabled) document.querySelector('a[href="preferences.html"]')?.setAttribute('title', 'Daily alerts: 9:00 AM');
}
