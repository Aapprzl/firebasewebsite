console.log('Website berjalan dengan baik!');

// Firebase configuration (salin dari Firebase Console)
const firebaseConfig = {

    apiKey: "AIzaSyC92AYwtOq9CDdPUubFGjDzHCf7BYiy0SA",  
    authDomain: "aapprzl.firebaseapp.com", 
    projectId: "aapprzl",  
    storageBucket: "aapprzl.firebasestorage.app", 
    messagingSenderId: "826881809548",  
    appId: "1:826881809548:web:96e34ee06f35bb40faafa9",
    measurementId: "G-G8DQGTB479"
  
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Firebase Storage Reference
  const storage = firebase.storage();
  const storageRef = storage.ref();
  
  // Form Upload
  document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
  
    if (file) {
      const fileRef = storageRef.child(file.name);
  
      // Upload file
      try {
        const snapshot = await fileRef.put(file);
        const downloadURL = await snapshot.ref.getDownloadURL();
  
        alert(`File berhasil diupload: ${downloadURL}`);
        // Tambahkan logika untuk menyimpan metadata file di Firestore jika diperlukan
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  });
  
  // Menampilkan Daftar File
  (async () => {
    try {
      const files = await storageRef.listAll();
      const fileList = document.getElementById("fileList");
  
      files.items.forEach(async (file) => {
        const url = await file.getDownloadURL();
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.innerHTML = `
          <a href="${url}" target="_blank">${file.name}</a>
          <button class="btn btn-danger btn-sm float-end delete-btn">Hapus</button>
        `;
        fileList.appendChild(listItem);
  
        // Tombol hapus file
        listItem.querySelector(".delete-btn").addEventListener("click", async () => {
          try {
            await file.delete();
            listItem.remove();
            alert("File berhasil dihapus.");
          } catch (error) {
            console.error("Error deleting file:", error);
          }
        });
      });
    } catch (error) {
      console.error("Error listing files:", error);
    }
  })();
  