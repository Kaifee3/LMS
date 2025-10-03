
// ------------------ Desktop Categories ------------------

const CategoryMenu = document.querySelector('.desktop-categories');
const CategoryMenuBtn = document.querySelector('.desktop-categories-btn');

CategoryMenuBtn.addEventListener('click', () => {
    CategoryMenu.classList.toggle('show');
});

// displays the menu on hover

// CategoryMenuBtn.addEventListener('mouseenter', () => {
//   CategoryMenu.classList.add('show');
// });

// CategoryMenu.addEventListener('mouseleave', () => {
//   CategoryMenu.classList.remove('show');
// });

window.addEventListener('click', (event) => {
    if (!event.target.closest('.desktop-categories') && !event.target.closest('.desktop-categories-btn')) {
        CategoryMenu.classList.remove('show');
    }
});


// ------------------ Mobile Devices Navebar ------------------

const mobMenuBtn = document.querySelector('.menubtn');
const mobMenuCloseBtn = document.querySelector('.menuClosebtn');
const mobMenu = document.querySelector('.mob-menu');

// donot changes the menu icon to x

// mobMenuBtn.addEventListener('click', () => {
//     mobMenu.classList.toggle('show');
// })

// mobCategoriesBtn.addEventListener('click', () => {
//     mobCategoriesMenu.classList.toggle('show');
// })

// changes menu icon to x

mobMenuBtn.addEventListener('click', () => {
    mobMenu.style.display='block';
    mobMenuBtn.style.display='none';
    mobMenuCloseBtn.style.display='block';
})

mobMenuCloseBtn.addEventListener('click', ()=> {
    mobMenu.style.display='none';
    mobMenuBtn.style.display='block';
    mobMenuCloseBtn.style.display='none';
})

window.addEventListener('click', (event) => {
    if (!event.target.closest('.mob-menu') && !event.target.closest('.menubtn')) {
      mobMenu.style.display = 'none';
      mobMenuBtn.style.display = 'block';
      mobMenuCloseBtn.style.display = 'none';
    }
});

//  ------------------ Mobile Devices Categories ------------------

const mobCategoriesBtn = document.querySelector('.categories-btn');
const mobCategorieClosesBtn = document.querySelector('.categories-close-btn');
const mobCategoriesMenu = document.querySelector('.mob-categories');
const mobCategoriesParent = document.querySelector('.categories-btn').parentNode;

// mobCategoriesBtn.addEventListener('click', () => {
//     mobCategoriesMenu.classList.toggle('show');
// })

// mobCategoriesBtn.addEventListener('click', () => {
//     mobCategoriesMenu.style.display='block';
//     mobCategoriesBtn.style.display='none';
//     mobCategorieClosesBtn.style.display='block';
// })

// mobCategorieClosesBtn.addEventListener('click', () => {
//     mobCategoriesMenu.style.display='none';
//     mobCategoriesBtn.style.display='block';
//     mobCategorieClosesBtn.style.display='none';
// })

let isCategoriesOpen = false;

mobCategoriesParent.addEventListener('click', () => {
    isCategoriesOpen = !isCategoriesOpen;
    mobCategoriesMenu.style.display = isCategoriesOpen ? 'block' : 'none';
    mobCategoriesBtn.style.display = isCategoriesOpen ? 'none' : 'block';
    mobCategorieClosesBtn.style.display = isCategoriesOpen ? 'block' : 'none';
});

//  ------------------ FAQ ------------------

const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
  const ques = faq.querySelector(".question");
  const ans = faq.querySelector(".answer");

  ques.addEventListener("click", () => {
    ans.classList.toggle("show");
  });
});

const sidebarBtn = document.querySelector(".sidebar-toggle");
const sidebarMenu = document.querySelector(".sidebar");
if(sidebarBtn && sidebarMenu){
    sidebarBtn.addEventListener('click', () => {
            const isOpen = sidebarMenu.classList.toggle('show');
            sidebarBtn.setAttribute('aria-expanded', isOpen);
    });
}

// Active link highlighting for dashboard sidebar
(function(){
    const current = window.location.pathname.replace(/\/$/, '');
    document.querySelectorAll('.sidebar a').forEach(a => {
        const href = a.getAttribute('href');
        if(!href) return;
        const norm = href.replace(/\/$/, '');
        if (norm && current.startsWith(norm)) {
            a.setAttribute('aria-current','page');
        }
    });
})();

// Sync aria-expanded for desktop categories trigger
const desktopCategoriesBtn = document.querySelector('.desktop-categories-btn');
if(desktopCategoriesBtn){
    desktopCategoriesBtn.addEventListener('click', () => {
        const expanded = desktopCategoriesBtn.getAttribute('aria-expanded') === 'true';
        desktopCategoriesBtn.setAttribute('aria-expanded', String(!expanded));
    });
}

// ------------------ Theme Toggle ------------------
(function(){
    const btn = document.querySelector('.theme-toggle');
    if(!btn) return;
    const root = document.documentElement;
    const STORAGE_KEY = 'skillmate-theme';
    const stored = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // If user stored preference apply it, else fallback to system (dark) or light default
    if(stored === 'dark' || stored === 'light') {
        root.setAttribute('data-theme', stored);
    } else if(prefersDark) {
        root.setAttribute('data-theme', 'dark');
    } else {
        root.setAttribute('data-theme', 'light');
    }
    // Reflect pressed state
    const syncPressed = () => {
        const current = root.getAttribute('data-theme');
        btn.setAttribute('aria-pressed', current === 'dark');
    };
    syncPressed();
    btn.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        root.classList.add('theme-transition');
        root.setAttribute('data-theme', next);
        localStorage.setItem(STORAGE_KEY, next);
        syncPressed();
        // Remove transition helper after animations complete
        window.setTimeout(()=>root.classList.remove('theme-transition'), 400);
    });
})();

// var lessonCount = 1;
//     document.getElementById('add-lesson').addEventListener('click', function() {
//       lessonCount++;
//       var lesson = document.createElement('div');
//       lesson.classList.add('form-group', 'lesson');
//       lesson.innerHTML = `
//         <div>
//         <label for="lesson_title_${lessonCount}">Lesson Title:</label>
//         <input type="text" class="form-control" id="lesson_title_${lessonCount}" name="lesson_title_${lessonCount}" required>
//         </div>
//         <div>
//         <label for="lesson_video_${lessonCount}">Lesson Video:</label>
//         <input type="file" class="form-control-file" id="lesson_video_${lessonCount}" name="lesson_video_${lessonCount}" accept="video/*" required>
//         </div>
//       `;
//       document.getElementById('lesson-fields').appendChild(lesson);
//     });

// let lessonCount = 1;

// function addLessonInput() {
//   lessonCount++;
//   const lessonsDiv = document.querySelector('.lesson-inputs');
//   const newLessonDiv = document.createElement('div');
//   newLessonDiv.classList.add('lesson');
//   newLessonDiv.innerHTML = `
//     <h4>Lesson ${lessonCount}</h4>
//     <div>
//       <label for="lesson_${lessonCount}_title">Lesson Title</label>
//       <input type="text" class="form-control" id="lesson_${lessonCount}_title" name="lesson_${lessonCount}_title" required>
//     </div>
//     <div>
//       <label for="lesson_${lessonCount}_video">Lesson Video</label>
//       <input type="file" class="form-control-file" id="lesson_${lessonCount}_video" name="lesson_${lessonCount}_video" accept="video/*" required>
//     </div>
//   `;
//   lessonsDiv.appendChild(newLessonDiv);
// }

// const addLessonButton = document.createElement('button');
// addLessonButton.textContent = 'Add Lesson';
// addLessonButton.type = 'button';
// addLessonButton.style.marginBottom = '1rem'
// addLessonButton.addEventListener('click', addLessonInput);
// const submitButton = document.querySelector('.upload-course');
// submitButton.insertAdjacentElement('beforebegin', addLessonButton);