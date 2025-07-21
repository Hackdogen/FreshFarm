document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal');
    const addForm = document.getElementById('addproductform');
    const imageInput = document.getElementById('image');
    const previewImage = document.getElementById('preview');
    const openBtn = document.querySelector('.add-products');
    const closeBtn = document.querySelector('.close-modal');

    function openmodal() {
        modal.style.display = 'flex';
    }

    function closemodal() {
        modal.style.display = 'none';
        addForm.reset();
        previewImage.style.display = 'none';
        previewImage.src = '';
    }

    // Event listeners
    openBtn.addEventListener('click', openmodal);
    closeBtn.addEventListener('click', closemodal);

    // Image preview logic
    imageInput.addEventListener('change', function () {
        const file = this.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            previewImage.src = '';
            previewImage.style.display = 'none';
        }
    });
});
