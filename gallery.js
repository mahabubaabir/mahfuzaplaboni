const galleryData = {
  'youth-green-entrepreneurship': {
    name: 'Youth Green Entrepreneurship',
    images: []
  },
  'business-operations': {
    name: 'Business Operations & Digital Marketing',
    images: []
  },
  'program-coordination': {
    name: 'Program Coordination & Youth Mobilization',
    images: []
  },
  'climate-leadership': {
    name: 'Climate Resilience & Leadership',
    images: []
  },
  'aanitas-art': {
    name: "Aanita's Art & Craft",
    images: []
  }
};

let currentGallery = [];
let currentIndex = 0;

function openGallery(projectKey) {
  const project = galleryData[projectKey];
  if (!project) return;
  currentGallery = project.images;
  currentIndex = 0;
  if (currentGallery.length === 0) {
    document.getElementById('gallery-image').style.display = 'none';
    document.getElementById('gallery-empty').style.display = 'block';
    document.getElementById('gallery-counter').textContent = '0 / 0';
    document.getElementById('gallery-prev').style.display = 'none';
    document.getElementById('gallery-next').style.display = 'none';
  } else {
    document.getElementById('gallery-image').style.display = 'block';
    document.getElementById('gallery-empty').style.display = 'none';
    document.getElementById('gallery-prev').style.display = 'block';
    document.getElementById('gallery-next').style.display = 'block';
    showImage(currentIndex);
  }
  document.getElementById('gallery-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function showImage(index) {
  const img = document.getElementById('gallery-image');
  img.src = currentGallery[index];
  document.getElementById('gallery-counter').textContent = `${index + 1} / ${currentGallery.length}`;
  document.getElementById('gallery-prev').style.opacity = index === 0 ? '0.3' : '1';
  document.getElementById('gallery-next').style.opacity = index === currentGallery.length - 1 ? '0.3' : '1';
}

function closeGallery() {
  document.getElementById('gallery-modal').classList.remove('active');
  document.body.style.overflow = '';
}

function prevImage() {
  if (currentIndex > 0) {
    currentIndex--;
    showImage(currentIndex);
  }
}

function nextImage() {
  if (currentIndex < currentGallery.length - 1) {
    currentIndex++;
    showImage(currentIndex);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-gallery]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openGallery(this.dataset.gallery);
    });
  });

  document.getElementById('gallery-close').addEventListener('click', closeGallery);
  document.getElementById('gallery-prev').addEventListener('click', prevImage);
  document.getElementById('gallery-next').addEventListener('click', nextImage);

  document.getElementById('gallery-modal').addEventListener('click', function (e) {
    if (e.target === this) closeGallery();
  });

  document.addEventListener('keydown', function (e) {
    if (!document.getElementById('gallery-modal').classList.contains('active')) return;
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });
});
