const streamData = {
  nursing: { title: 'Government B.Sc Nursing hospital jobs across India', course: 'B.Sc Nursing', roles: ['Nursing Officer', 'Staff Nurse', 'Clinical Nurse', 'Community Health Nurse', 'ICU Nurse', 'Emergency Nurse', 'OT Nurse', 'Public Health Nurse', 'Nurse Educator', 'Nursing Supervisor'], organizations: ['AIIMS New Delhi', 'AIIMS Hyderabad', 'AIIMS Mangalagiri', 'AIIMS Bibinagar', 'AIIMS Bhubaneswar', 'AIIMS Jodhpur', 'AIIMS Patna', 'AIIMS Rishikesh', 'AIIMS Bhopal', 'AIIMS Raipur', 'ESIC Medical College Delhi', 'ESIC Hospital Hyderabad', 'ESIC Hospital Bengaluru', 'PGIMER Chandigarh', 'JIPMER Puducherry', 'NIMHANS Bengaluru', 'Safdarjung Hospital Delhi', 'Ram Manohar Lohia Hospital Delhi', 'Lady Hardinge Medical College Delhi', 'Tata Memorial Centre Mumbai', 'KGMU Lucknow', 'SGPGIMS Lucknow', 'SCTIMST Thiruvananthapuram', 'Government Medical College Chennai', 'Government Medical College Kolkata', 'Government Medical College Jaipur', 'Government Medical College Ahmedabad', 'Government Medical College Guwahati', 'Central Government Health Scheme', 'State Health Department — India'], portals: ['https://www.aiimsexams.ac.in/', 'https://www.esic.gov.in/recruitments', 'https://pgimer.edu.in/', 'https://www.jipmer.edu.in/announcement/recruitment', 'https://www.nimhans.ac.in/careers', 'https://tmc.gov.in/', 'https://main.mohfw.gov.in/'] },
  agriculture: { title: 'B.Sc Agriculture jobs', course: 'B.Sc Agriculture', roles: ['Agriculture Officer', 'Field Officer', 'Agriculture Development Officer', 'Farm Manager', 'Soil Scientist', 'Agriculture Assistant', 'Horticulture Officer', 'Agribusiness Executive'], organizations: ['NABARD', 'Food Corporation of India', 'State Agriculture Department', 'ICAR', 'Krishi Vigyan Kendra', 'AgriTech Company'], portals: ['https://www.nabard.org/', 'https://fci.gov.in/'] },
  bcom: { title: 'B.Com jobs', course: 'B.Com', roles: ['Accounts Executive', 'Banking Associate', 'RBI Assistant', 'IBPS PO', 'Tax Assistant', 'Audit Associate', 'Finance Analyst', 'GST Executive'], organizations: ['Reserve Bank of India', 'IBPS', 'Staff Selection Commission', 'Public Sector Bank', 'Deloitte', 'Finance Services Company'], portals: ['https://www.rbi.org.in/', 'https://www.ibps.in/'] },
  btech: { title: 'B.Tech & IT software jobs', course: 'B.Tech', roles: ['Software Engineer', 'Data Analyst', 'QA Engineer', 'Cloud Support Engineer', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer', 'Cybersecurity Analyst', 'Mobile App Developer', 'Machine Learning Engineer', 'UI Engineer', 'Graduate Engineer Trainee'], organizations: ['TCS', 'Infosys', 'Wipro', 'HCLTech', 'Tech Mahindra', 'Accenture', 'Cognizant', 'Capgemini', 'LTIMindtree', 'Mphasis', 'Persistent Systems', 'Zoho', 'Freshworks', 'Oracle India', 'Microsoft India', 'Amazon India', 'Google India', 'IBM India', 'Cisco India', 'Deloitte India', 'Adobe India', 'SAP India', 'Razorpay', 'PhonePe', 'Flipkart', 'Walmart Global Tech', 'Myntra', 'Swiggy', 'Zomato', 'Paytm', 'NVIDIA India', 'Intel India', 'Qualcomm India', 'Juspay', 'BrowserStack', 'Groww', 'Meesho', 'Ola Electric', 'ISRO', 'DRDO'], portals: ['https://www.tcs.com/careers', 'https://www.infosys.com/careers/', 'https://careers.wipro.com/', 'https://www.hcltech.com/careers', 'https://careers.techmahindra.com/', 'https://www.accenture.com/in-en/careers', 'https://careers.cognizant.com/in/en', 'https://www.capgemini.com/in-en/careers/', 'https://www.ltimindtree.com/careers/', 'https://careers.oracle.com/', 'https://www.amazon.jobs/en/locations/india', 'https://careers.google.com/locations/india/', 'https://careers.microsoft.com/v2/global/en/locations/india.html', 'https://www.ibm.com/in-en/careers', 'https://jobs.cisco.com/', 'https://www.deloitte.com/in/en/careers.html', 'https://www.adobe.com/careers.html', 'https://www.sap.com/india/about/careers.html', 'https://www.flipkartcareers.com/', 'https://careers.walmart.com/', 'https://www.nvidia.com/en-in/about-nvidia/careers/', 'https://www.intel.com/content/www/us/en/jobs/locations/india.html', 'https://www.qualcomm.com/company/careers', 'https://www.browserstack.com/careers', 'https://careers.phonepe.com/', 'https://www.meesho.io/jobs', 'https://www.swiggy.com/careers', 'https://www.zomato.com/careers', 'https://jobs.lever.co/razorpay', 'https://www.isro.gov.in/Careers.html', 'https://www.drdo.gov.in/careers'] },
  graduate: { title: 'Any Graduate jobs', course: 'Any Graduate', roles: ['SSC CGL Officer', 'RRB NTPC Executive', 'UPSC Civil Services', 'Banking Officer', 'Administrative Assistant', 'Operations Executive', 'Customer Success Associate', 'Research Assistant'], organizations: ['Staff Selection Commission', 'Railway Recruitment Board', 'Union Public Service Commission', 'IBPS', 'Government Department', 'Growth Company'], portals: ['https://ssc.gov.in/', 'https://www.rrbapply.gov.in/'] },
};

const params = new URLSearchParams(window.location.search);
const searchQuery = (params.get('q') || '').trim().toLowerCase();
const inferredStream = !params.get('stream') && /(nurs|staff nurse|clinical|icu|hospital|healthcare)/.test(searchQuery)
  ? 'nursing'
  : !params.get('stream') && /(software|developer|data|cloud|devops|cyber|java|python|btech|it job)/.test(searchQuery)
    ? 'btech'
    : !params.get('stream') && /(agri|farm|soil|horticulture|nabard)/.test(searchQuery)
      ? 'agriculture'
      : !params.get('stream') && /(account|bank|finance|tally|gst|bcom|audit)/.test(searchQuery)
        ? 'bcom'
        : 'graduate';
let streamKey = params.get('stream') || inferredStream;
if (!streamData[streamKey]) streamKey = 'graduate';
const data = streamData[streamKey];
const nursingRegions = [
  { name: 'North India', cities: ['New Delhi', 'Chandigarh', 'Lucknow', 'Jaipur', 'Rishikesh'] },
  { name: 'South India', cities: ['Hyderabad', 'Bengaluru', 'Chennai', 'Puducherry', 'Thiruvananthapuram'] },
  { name: 'East India', cities: ['Kolkata', 'Bhubaneswar', 'Patna', 'Guwahati', 'Raipur'] },
  { name: 'West India', cities: ['Mumbai', 'Ahmedabad', 'Bhopal', 'Jodhpur', 'Nagpur'] },
];
const nursingSalaryRanges = [
  ['₹15,000 – ₹22,000', '₹15k – ₹22k / month'],
  ['₹18,000 – ₹28,000', '₹18k – ₹28k / month'],
  ['₹22,000 – ₹35,000', '₹22k – ₹35k / month'],
  ['₹28,000 – ₹45,000', '₹28k – ₹45k / month'],
  ['₹35,000 – ₹55,000', '₹35k – ₹55k / month'],
  ['₹45,000 – ₹70,000', '₹45k – ₹70k / month'],
];
const nursingPortals = {
  'AIIMS India': 'https://www.aiimsexams.ac.in/',
  'ESIC Hospitals': 'https://www.esic.gov.in/recruitments',
  'Government Medical College': 'https://www.mohfw.gov.in/',
  'State Health Department': 'https://main.mohfw.gov.in/',
  'Apollo Hospitals': 'https://www.apollohospitals.com/careers/',
  'Fortis Healthcare': 'https://www.fortishealthcare.com/careers',
  'Manipal Hospitals': 'https://www.manipalhospitals.com/careers/',
  'Max Healthcare': 'https://www.maxhealthcare.in/careers',
  'Narayana Health': 'https://www.narayanahealth.org/careers',
  'Medanta Hospital': 'https://www.medanta.org/careers',
  'Rainbow Children’s Hospital': 'https://www.rainbowhospitals.in/careers',
  'KIMS Hospitals': 'https://www.kimshospitals.com/careers/',
  'CARE Hospitals': 'https://www.carehospitals.com/careers',
  'Aster Hospitals': 'https://www.asterhospitals.in/careers',
  'Columbia Asia Hospitals': 'https://www.columbiaasia.com/india/careers/',
  'Christian Medical College': 'https://www.cmch-vellore.edu/careers/',
  'Tata Memorial Centre': 'https://tmc.gov.in/',
};
const btechEmployers = [
  { name: 'DRDO', government: true, portal: 'https://www.drdo.gov.in/careers' },
  { name: 'ISRO', government: true, portal: 'https://www.isro.gov.in/Careers.html' },
  { name: 'NIC — National Informatics Centre', government: true, portal: 'https://www.nic.in/careers/' },
  { name: 'CDAC — Centre for Development of Advanced Computing', government: true, portal: 'https://www.cdac.in/index.aspx?id=ca' },
  { name: 'BEL — Bharat Electronics Limited', government: true, portal: 'https://bel-india.in/careers/' },
  { name: 'ECIL — Electronics Corporation of India', government: true, portal: 'https://www.ecil.co.in/jobs.php' },
  { name: 'HAL — Hindustan Aeronautics Limited', government: true, portal: 'https://hal-india.co.in/careers' },
  { name: 'BHEL — Bharat Heavy Electricals Limited', government: true, portal: 'https://careers.bhel.in/' },
  { name: 'POWERGRID', government: true, portal: 'https://www.powergrid.in/en/job-opportunities' },
  { name: 'NTPC — IT & Systems', government: true, portal: 'https://careers.ntpc.co.in/' },
  { name: 'Indian Railways — CRIS', government: true, portal: 'https://cris.org.in/careers/' },
  { name: 'RBI — IT Officer', government: true, portal: 'https://www.rbi.org.in/Scripts/BS_ViewBulletin.aspx' },
  { name: 'SSC — Scientific Assistant', government: true, portal: 'https://ssc.gov.in/' },
  { name: 'UPSC — Engineering Services', government: true, portal: 'https://upsc.gov.in/' },
  { name: 'NICSI', government: true, portal: 'https://www.nicsi.nic.in/careers' },
  { name: 'TCS', government: false, portal: 'https://www.tcs.com/careers' },
  { name: 'Infosys', government: false, portal: 'https://www.infosys.com/careers/' },
  { name: 'Wipro', government: false, portal: 'https://careers.wipro.com/' },
  { name: 'HCLTech', government: false, portal: 'https://www.hcltech.com/careers' },
  { name: 'Tech Mahindra', government: false, portal: 'https://careers.techmahindra.com/' },
  { name: 'Accenture', government: false, portal: 'https://www.accenture.com/in-en/careers' },
  { name: 'Cognizant', government: false, portal: 'https://careers.cognizant.com/in/en' },
  { name: 'Capgemini', government: false, portal: 'https://www.capgemini.com/in-en/careers/' },
  { name: 'Microsoft India', government: false, portal: 'https://careers.microsoft.com/v2/global/en/locations/india.html' },
  { name: 'Amazon India', government: false, portal: 'https://www.amazon.jobs/en/locations/india' },
];
const dailyOffset = Math.floor(Date.now() / 86400000) % 50;
const skills = JSON.parse(localStorage.getItem('searchMeSkills') || '[]');
const preferredFields = JSON.parse(localStorage.getItem('searchMePreferredFields') || '[]');
const jobs = Array.from({ length: 50 }, (_, index) => {
  const role = data.roles[index % data.roles.length];
  const employer = streamKey === 'btech' ? btechEmployers[index % btechEmployers.length] : null;
  const organization = employer?.name || data.organizations[index % data.organizations.length];
  const government = streamKey === 'nursing' ? true : (employer ? employer.government : index % 3 !== 1);
  const fieldTerms = government ? 'government ' : 'private ';
  const nursingSalary = nursingSalaryRanges[index % nursingSalaryRanges.length];
  const region = streamKey === 'nursing' ? nursingRegions[index % nursingRegions.length] : null;
  const city = region ? region.cities[index % region.cities.length] : 'All India';
  const salaryValue = streamKey === 'nursing' ? Number(nursingSalary[0].match(/\d+/)[0]) * 1000 : government ? 35000 + (index % 5) * 10000 : 40000 + (index % 6) * 20000;
  return { title: `${role}${index > data.roles.length - 1 ? ` — Opening ${index + 1}` : ''}`, organization, government, region: region?.name || '', city, search: `${role} ${organization} ${data.course} ${fieldTerms} ${streamKey} ${region?.name || ''} ${city}`.toLowerCase(), portal: employer?.portal || (streamKey === 'nursing' ? (nursingPortals[organization] || 'https://www.nursingworld.org/') : data.portals[index % data.portals.length]), salary: streamKey === 'nursing' ? nursingSalary[1] : (government ? '₹35k – ₹1.2L / month' : '₹4 – ₹18 LPA'), salaryDetail: streamKey === 'nursing' ? nursingSalary[0] : '', salaryValue, dayRank: (index - dailyOffset + 50) % 50 };
}).sort((a, b) => {
  const aSkill = skills.some((skill) => a.search.includes(skill)) ? 0 : 1;
  const bSkill = skills.some((skill) => b.search.includes(skill)) ? 0 : 1;
  const aPreferred = preferredFields.some((field) => a.search.includes(field)) ? 0 : 1;
  const bPreferred = preferredFields.some((field) => b.search.includes(field)) ? 0 : 1;
  return (aPreferred - bPreferred) || (aSkill - bSkill) || (a.dayRank - b.dayRank);
});

const list = document.querySelector('#streamJobs');
document.querySelector('#streamTitle').textContent = data.title;
document.querySelector('#pageStream').value = streamKey;
document.querySelector('#streamCount').textContent = '50';
document.querySelector('#streamSearch').value = searchQuery;
document.querySelector('.intro').textContent = searchQuery
  ? `Vacancies matching "${params.get('q')}". Official destinations are shown on every result.`
  : `50 relevant ${data.course} opportunities, refreshed daily. Your saved skills and preferences are prioritized.`;
const salaryFilter = document.createElement('select');
salaryFilter.className = 'page-stream-select';
salaryFilter.id = 'salaryFilter';
salaryFilter.innerHTML = '<option value="">All salary ranges</option><option value="entry">₹15,000 – ₹25,000</option><option value="mid">₹25,000 – ₹45,000</option><option value="high">₹45,000+</option>';
document.querySelector('.stream-toolbar').appendChild(salaryFilter);
if (streamKey === 'nursing') {
  const regionSelect = document.createElement('select');
  regionSelect.className = 'page-stream-select';
  regionSelect.id = 'regionFilter';
  regionSelect.innerHTML = '<option value="">All India</option><option value="North India">North India</option><option value="South India">South India</option><option value="East India">East India</option><option value="West India">West India</option>';
  document.querySelector('.page-heading-row').appendChild(regionSelect);
}

function render() {
  const query = document.querySelector('#streamSearch').value.trim().toLowerCase();
  const type = document.querySelector('input[name="jobType"]:checked')?.value || 'all';
  const region = document.querySelector('#regionFilter')?.value || '';
  const salaryRange = document.querySelector('#salaryFilter')?.value || '';
  const visible = jobs.filter((job) => (!query || job.search.includes(query)) && (!region || job.region === region) && (type === 'all' || (type === 'government') === job.government) && (!salaryRange || (salaryRange === 'entry' && job.salaryValue < 25000) || (salaryRange === 'mid' && job.salaryValue >= 25000 && job.salaryValue < 45000) || (salaryRange === 'high' && job.salaryValue >= 45000)));
  list.innerHTML = visible.map((job, index) => `<article class="stream-job-card"><div class="stream-logo ${job.government ? 'gov-logo' : 'private-logo'}">${job.organization.slice(0, 3).toUpperCase()}</div><div><div class="stream-job-top"><h3>${job.title}</h3><span>${job.government ? 'Government' : 'Private'}</span></div><p>${job.organization} <b>✓</b></p><div class="stream-meta"><span>⌾ ${job.city}, ${job.region}</span><span>◷ ${index + 12} days left</span><span>${job.salary}</span></div>${job.salaryDetail ? `<small class="salary-detail">Typical monthly range: ${job.salaryDetail}</small>` : ''}<br><small class="course-chip">${data.course}</small><p class="portal-source">Official destination: ${new URL(job.portal).hostname.replace(/^www\\./, '')}</p><br><a href="${job.portal}" target="_blank" rel="noopener noreferrer">Apply on ${job.government ? 'official portal' : 'hospital website'} ↗</a></div></article>`).join('');
  document.querySelector('#streamEmpty').hidden = visible.length !== 0;
}
document.querySelectorAll('input[name="jobType"]').forEach((radio) => radio.addEventListener('change', () => {
  document.querySelectorAll('.radio-filter').forEach((item) => item.classList.toggle('active', item.querySelector('input').checked));
  render();
}));
document.querySelector('#streamSearch').addEventListener('input', render);
document.querySelector('#salaryFilter').addEventListener('change', render);
document.querySelector('#regionFilter')?.addEventListener('change', render);
document.querySelector('#pageStream').addEventListener('change', (event) => { window.location.href = `jobs.html?stream=${event.target.value}`; });
render();
