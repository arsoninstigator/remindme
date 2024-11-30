document.getElementById('saveBtn').addEventListener('click', saveScholarship);

function saveScholarship() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const url = document.getElementById('url').value;
  const deadline = document.getElementById('deadline').value;

  if (title && description && url && deadline) {
    const scholarship = { title, description, url, deadline: new Date(deadline).getTime() };
    chrome.storage.local.get({ scholarships: [] }, (result) => {
      const scholarships = [...result.scholarships, scholarship];
      scholarships.sort((a, b) => a.deadline - b.deadline); // Sort by deadline
      chrome.storage.local.set({ scholarships }, () => {
        displayScholarships();
        alert('Scholarship saved!');
      });
    });
  } else {
    alert('Please fill all fields.');
  }
}

function displayScholarships() {
  chrome.storage.local.get({ scholarships: [] }, (result) => {
    const scholarshipList = document.getElementById('scholarshipList');
    scholarshipList.innerHTML = '';
    result.scholarships.forEach((scholarship) => {
      const div = document.createElement('div');
      div.className = 'scholarship';
      div.innerHTML = `
        <h3>${scholarship.title}</h3>
        <p>${scholarship.description}</p>
        <a href="${scholarship.url}" target="_blank">Go to website</a>
        <p>Deadline: ${new Date(scholarship.deadline).toLocaleDateString()}</p>
      `;
      scholarshipList.appendChild(div);
    });
  });
}

document.addEventListener('DOMContentLoaded', displayScholarships);
