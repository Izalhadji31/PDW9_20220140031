document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Mengambil nilai-nilai formulir
    var name = document.getElementById('name').value;
    var purchaseDate = document.getElementById('purchaseDate').value;
    var store = document.getElementById('store').value;
    var rating = document.getElementById('rating').value;
    var review = document.getElementById('review').value;
    var photoInput = document.getElementById('photo');
    var reader = new FileReader();

    // Membaca file foto jika ada
    if (photoInput.files.length > 0) {
        reader.readAsDataURL(photoInput.files[0]);
    }

    // Ketika file selesai dibaca
    reader.onload = function(e) {
        // Menampilkan pratinjau gambar atau lakukan hal lain dengan file
        var imageDataUrl = e.target.result;

        // Menampilkan alert dengan SweetAlert2
        Swal.fire({
            title: 'Konfirmasi Ulasan Anda',
            html: `
                <div class="form-values">
                    <div class="form-group">
                        <label for="name">Nama:</label>
                        <input type="text" value="${name}" readonly />
                    </div>
                    <div class="form-group">
                        <label for="purchaseDate">Tanggal Pembelian:</label>
                        <input type="text" value="${purchaseDate}" readonly />
                    </div>
                    <div class="form-group">
                        <label for="store">Tempat Pembelian:</label>
                        <input type="text" value="${store}" readonly />
                    </div>
                    <div class="form-group">
                        <label for="rating">Penilaian:</label>
                        <input type="text" value="${rating}" readonly />
                    </div>
                    <div class="form-group">
                        <label for="review">Ulasan:</label>
                        <textarea readonly>${review}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="photo">Foto:</label>
                        <img src="${imageDataUrl}" style="max-width: 100%;" />
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Simpan',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            customClass: {
                popup: 'swal-popup',
                htmlContainer: 'swal-html-container',
                confirmButton: 'swal-confirm-button',
                cancelButton: 'swal-cancel-button',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Pengguna mengklik "Simpan"
                Swal.fire({
                    title: 'Terima Kasih',
                    text: 'Terima kasih sudah berbagi ulasanmu',
                    icon: 'success',
                    customClass: {
                        title: 'swal-title',
                        closeButton: 'swal-close-button'
                    }
                });
                // Lakukan pemrosesan lanjutan atau kirim formulir
                var reviewData = {
                    name: name,
                    purchaseDate: purchaseDate,
                    store: store,
                    rating: rating,
                    review: review
                };
                console.log(reviewData); // Menampilkan data ulasan di konsol
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Pengguna mengklik "Batal"
                Swal.fire({
                    title: 'Dibatalkan',
                    text: 'Ulasan kamu tidak jadi dikirim',
                    icon: 'error',
                    customClass: {
                        title: 'swal-title',
                        closeButton: 'swal-close-button'
                    }
                });
            }
        });
    };
});
