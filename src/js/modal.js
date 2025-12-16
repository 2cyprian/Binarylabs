// Modal functionality
export function initializeModal() {
    // Create modal HTML
    const modalHTML = `
        <div id="joinModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Join Our Next Cohort</h2>
                    <button class="modal-close-btn" id="modalCloseBtn">&times;</button>
                </div>
                <div class="modal-body" id="modalBody">
                    <!-- Form will be loaded here -->
                </div>
            </div>
        </div>
    `;

    // Append modal to body if it doesn't exist
    if (!document.getElementById('joinModal')) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Load form into modal
    loadFormIntoModal();

    // Setup event listeners
    setupModalEvents();
}

async function loadFormIntoModal() {
    try {
        const response = await fetch('/src/components/form.html');
        const html = await response.text();
        
        // Extract form content (remove the HTML/body tags)
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const formContent = doc.querySelector('main')?.innerHTML || '';
        
        const modalBody = document.getElementById('modalBody');
        if (modalBody) {
            modalBody.innerHTML = formContent;
            // Initialize form functionality after loading
            initializeFormFunctionality();
        }
    } catch (error) {
        console.error('Error loading form into modal:', error);
    }
}

// Initialize form functionality (from form.js logic)
function initializeFormFunctionality() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('file-upload');
    const uploadText = document.getElementById('uploadText');
    const uploadSubText = document.getElementById('uploadSubText');
    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');

    if (!form) return; // Form not loaded yet

    // --- File Upload Logic ---

    // Click to open file dialog
    if (dropZone) {
        dropZone.addEventListener('click', () => {
            fileInput.click();
        });
    }

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone?.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight drop zone when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone?.addEventListener(eventName, () => {
            dropZone.classList.add('drag-over');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone?.addEventListener(eventName, () => {
            dropZone.classList.remove('drag-over');
        }, false);
    });

    // Handle dropped files
    dropZone?.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }, false);

    // Handle selected files via click
    fileInput?.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            if (validateFile(file)) {
                updateUI(file);
                if (fileInput.files.length === 0) {
                    fileInput.files = files;
                }
            }
        }
    }

    function validateFile(file) {
        const validTypes = ['application/pdf'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
            alert('Please upload a PDF file.');
            return false;
        }

        if (file.size > maxSize) {
            alert('File size exceeds 5MB limit.');
            return false;
        }

        return true;
    }

    function updateUI(file) {
        uploadText.textContent = file.name;
        uploadText.style.color = '#182638';
        uploadSubText.textContent = formatBytes(file.size);
    }

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    // --- Form Submission Logic ---

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validation check
        const inputs = form.querySelectorAll('input[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value) {
                input.classList.add('input-error');
                isValid = false;
            } else {
                input.classList.remove('input-error');
            }
        });

        if (isValid) {
            const originalBtnText = submitBtn.querySelector('span').textContent;
            submitBtn.querySelector('span').textContent = "Submitting...";
            submitBtn.style.opacity = "0.7";
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                alert('Application Submitted Successfully!');
                form.reset();
                // Reset Upload UI
                uploadText.textContent = "Click to Upload or drag and drop";
                uploadText.style.color = "rgba(24, 38, 56, 0.4)";
                uploadSubText.textContent = "PDF, Max 5MB";
                
                submitBtn.querySelector('span').textContent = originalBtnText;
                submitBtn.style.opacity = "1";
                submitBtn.disabled = false;
                
                // Close modal after successful submission
                const modal = document.getElementById('joinModal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            }, 1500);
        }
    });

    // Remove error class on input
    form.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', () => {
            if(input.value) input.classList.remove('input-error');
        });
    });
}

function setupModalEvents() {
    const modal = document.getElementById('joinModal');
    const closeBtn = document.getElementById('modalCloseBtn');
    
    // All buttons that should open the modal
    const joinButtons = document.querySelectorAll(
        'a.btn-nav-cta, a.btn-secondary, a.btn-red'
    );

    // Open modal
    joinButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });

    // Close modal - close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal - clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('joinModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeModal);
} else {
    initializeModal();
}
