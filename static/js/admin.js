// ===== TOGGLE THEME =====
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Auto-hide alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => alert.remove(), 300);
        }, 5000);
    });
});

// ===== SEARCH TABLE =====
function searchTable() {
    const input = document.getElementById('searchUser') || document.getElementById('searchProduct');
    const filter = input.value.toUpperCase();
    const table = document.getElementById('usersTable') || document.getElementById('productsTable');
    const tr = table.getElementsByTagName('tr');
    
    for (let i = 1; i < tr.length; i++) {
        let txtValue = tr[i].textContent || tr[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = '';
        } else {
            tr[i].style.display = 'none';
        }
    }
}

// ===== CONFIRM DELETE =====
function confirmDelete(id, name) {
    const modal = document.getElementById('deleteModal');
    const message = document.getElementById('deleteMessage');
    const form = document.getElementById('deleteForm');
    
    // Determinar si es usuario o producto
    const isUser = window.location.href.includes('/users');
    const deleteUrl = isUser 
        ? `/admin/users/delete/${id}`
        : `/admin/products/delete/${id}`;
    
    message.textContent = `¿Estás seguro de que deseas eliminar "${name}"? Esta acción no se puede deshacer.`;
    form.action = deleteUrl;
    modal.style.display = 'block';
    
    // Close modal on outside click
    modal.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }
}

// ===== CLOSE MODAL =====
function closeModal() {
    const modal = document.getElementById('deleteModal');
    modal.style.display = 'none';
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(event) {
    // ESC to close modal
    if (event.key === 'Escape') {
        closeModal();
    }
});
