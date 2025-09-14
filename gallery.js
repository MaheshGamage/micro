// Load projects from JSON file and display them
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
});

// Global variables to track current image and project
let currentProjectIndex = 0;
let currentImageIndex = 0;
let currentProjectImages = [];

function loadProjects() {
    fetch('projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(projects => {
            displayProjects(projects);
        })
        .catch(error => {
            console.error('Error loading projects:', error);
            document.getElementById('loading-message').textContent = 
                'Error loading projects. Please try again later.';
        });
}

function displayProjects(projects) {
    const galleryContainer = document.getElementById('gallery-container');
    const loadingMessage = document.getElementById('loading-message');
    
    // Hide loading message
    loadingMessage.style.display = 'none';
    
    // Clear container
    galleryContainer.innerHTML = '';
    
    if (projects.length === 0) {
        galleryContainer.innerHTML = '<p class="no-projects">No projects to display yet. Check back soon!</p>';
        return;
    }
    
    // Create project elements
    projects.forEach((project, projectIndex) => {
        const projectElement = createProjectElement(project, projectIndex);
        galleryContainer.appendChild(projectElement);
    });
}

function createProjectElement(project, projectIndex) {
    const projectContainer = document.createElement('div');
    projectContainer.className = 'project-container';
    
    // Project title
    const title = document.createElement('h2');
    title.className = 'project-title';
    title.textContent = project.title;
    projectContainer.appendChild(title);
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'project-content';
    
    // Images container
    const imagesContainer = document.createElement('div');
    imagesContainer.className = 'images-container';
    
    project.images.forEach((image, imageIndex) => {
        const img = document.createElement('img');
        img.src = image;
        img.alt = project.title;
        img.className = 'project-image';
        img.addEventListener('click', () => openModal(projectIndex, imageIndex));
        imagesContainer.appendChild(img);
    });
    
    contentDiv.appendChild(imagesContainer);
    
    // Description container
    const descriptionContainer = document.createElement('div');
    descriptionContainer.className = 'project-description';
    
    const descTitle = document.createElement('h3');
    descTitle.textContent = 'Project Details';
    descriptionContainer.appendChild(descTitle);
    
    if (project.date) {
        const date = document.createElement('span');
        date.className = 'project-date';
        date.textContent = `Completed: ${project.date}`;
        descriptionContainer.appendChild(date);
    }
    
    const description = document.createElement('p');
    description.textContent = project.description;
    descriptionContainer.appendChild(description);
    
    contentDiv.appendChild(descriptionContainer);
    projectContainer.appendChild(contentDiv);
    
    return projectContainer;
}

// Modal functionality for enlarged images
function openModal(projectIndex, imageIndex) {
    // Get projects data
    fetch('projects.json')
        .then(response => response.json())
        .then(projects => {
            currentProjectIndex = projectIndex;
            currentImageIndex = imageIndex;
            currentProjectImages = projects[projectIndex].images;
            
            const modal = document.getElementById('imageModal');
            if (!modal) {
                createModal();
            }
            
            const modalImg = document.getElementById('modalImage');
            modal.style.display = 'block';
            modalImg.src = currentProjectImages[imageIndex];
        })
        .catch(error => {
            console.error('Error loading project data:', error);
        });
}

function createModal() {
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'modal';
    
    // Close button
    const closeSpan = document.createElement('span');
    closeSpan.className = 'close';
    closeSpan.innerHTML = '&times;';
    closeSpan.onclick = closeModal;
    
    // Previous button
    const prevButton = document.createElement('a');
    prevButton.className = 'modal-prev';
    prevButton.innerHTML = '&#10094;';
    prevButton.onclick = () => changeImage(-1);
    
    // Next button
    const nextButton = document.createElement('a');
    nextButton.className = 'modal-next';
    nextButton.innerHTML = '&#10095;';
    nextButton.onclick = () => changeImage(1);
    
    // Image container
    const modalImg = document.createElement('img');
    modalImg.className = 'modal-content';
    modalImg.id = 'modalImage';
    
    modal.appendChild(closeSpan);
    modal.appendChild(prevButton);
    modal.appendChild(nextButton);
    modal.appendChild(modalImg);
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside the image
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (modal.style.display === 'block') {
            if (event.key === 'ArrowLeft') {
                changeImage(-1);
            } else if (event.key === 'ArrowRight') {
                changeImage(1);
            } else if (event.key === 'Escape') {
                closeModal();
            }
        }
    });
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    // Handle wrapping around
    if (currentImageIndex >= currentProjectImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = currentProjectImages.length - 1;
    }
    
    const modalImg = document.getElementById('modalImage');
    modalImg.src = currentProjectImages[currentImageIndex];
}