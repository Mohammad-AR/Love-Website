document.addEventListener("DOMContentLoaded", () => {
  // Falling Hearts Logic
  const fallingHeartsContainer = document.querySelector(".falling-hearts");
  if (fallingHeartsContainer) {
    function createHeart() {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = Math.random() * 2 + 3 + "s";
      heart.style.animationDelay = Math.random() * 2 + "s";
      heart.style.opacity = Math.random() * 0.5 + 0.3;
      heart.style.transform = `scale(${Math.random() * 0.5 + 0.5}) rotate(${
        Math.random() * 360
      }deg)`;

      heart.addEventListener("animationend", () => {
        heart.remove();
      });

      fallingHeartsContainer.appendChild(heart);
    }

    function startFallingHearts() {
      while (fallingHeartsContainer.firstChild) {
        fallingHeartsContainer.removeChild(fallingHeartsContainer.firstChild);
      }
      setInterval(createHeart, 200);
    }
    startFallingHearts();
  }

  // Love Counter Logic
  const checkLoveBtn = document.getElementById("checkLoveBtn");
  const name1Input = document.getElementById("beasty");
  const name2Input = document.getElementById("fluffy-puffy");
  const errorMessage = document.getElementById("errorMessage");
  const percentage1Element = document.getElementById("percentage1");
  const percentage2Element = document.getElementById("percentage2");
  const nameDisplay1 = document.getElementById("nameDisplay1");
  const nameDisplay2 = document.getElementById("nameDisplay2");
  const animatedName1 = document.getElementById("animatedName1");
  const animatedName2 = document.getElementById("animatedName2");
  const beatingHeart1 = document.getElementById("beatingHeart1");
  const beatingHeart2 = document.getElementById("beatingHeart2");

  if (checkLoveBtn) {
    checkLoveBtn.addEventListener("click", () => {
      const name1 = name1Input.value.trim();
      const name2 = name2Input.value.trim();

      // Clear previous states
      errorMessage.classList.remove("show");
      errorMessage.textContent = "";
      percentage1Element.textContent = "0%";
      percentage2Element.textContent = "0%";

      // إخفاء القلوب النابضة والأسماء المتحركة في كل مرة يضغط فيها المستخدم
      if (beatingHeart1) beatingHeart1.classList.remove("show");
      if (beatingHeart2) beatingHeart2.classList.remove("show");
      animatedName1.classList.remove("show");
      animatedName2.classList.remove("show");

      // **** التعديل هنا: أظهر الأسماء أولاً وقبل كل شيء ****
      nameDisplay1.textContent = name1;
      nameDisplay2.textContent = name2;
      nameDisplay1.classList.add("show"); // عرض الاسم الأول
      nameDisplay2.classList.add("show"); // عرض الاسم الثاني

      if (name1 === "" || name2 === "") {
        errorMessage.textContent = "Please enter both names!";
        errorMessage.classList.add("show");
        // إذا كان هناك خطأ، يجب إخفاء النسبة المئوية أيضاً
        percentage1Element.textContent = "0%";
        percentage2Element.textContent = "0%";
        return;
      }

      const lowerName1 = name1.toLowerCase();
      const lowerName2 = name2.toLowerCase();

      // IMPORTANT: Change these names if you want to use different specific names for 100%
      const areNamesValid =
        (lowerName1 === "beasty" && lowerName2 === "fluffy-puffy") ||
        (lowerName1 === "fluffy-puffy" && lowerName2 === "beasty");

      if (areNamesValid) {
        let lovePercentage = 100;
        animatePercentage(percentage1Element, 0, lovePercentage, 1000);
        animatePercentage(percentage2Element, 0, lovePercentage, 1000);

        // Show beating heart GIF if 100%
        if (beatingHeart1) beatingHeart1.classList.add("show");
        if (beatingHeart2) beatingHeart2.classList.add("show");

        // Animate names flying up (تظهر فقط عند 100%)
        animatedName1.textContent = name1;
        animatedName2.textContent = name2;
        animatedName1.style.animation = "flyUpAndGlow 4s ease-out forwards";
        animatedName2.style.animation =
          "flyUpUpAndGlow 4s 0.5s ease-out forwards"; // Slight delay for second name
        animatedName1.classList.add("show");
        animatedName2.classList.add("show");
      } else {
        // إذا لم تكن الأسماء هي الأسماء السرية، أظهر رسالة خطأ
        errorMessage.textContent =
          "These names do not match our special pair! 😉"; // رسالة خطأ مخصصة
        errorMessage.classList.add("show");

        // إخفاء أي نسب مئوية أو صور GIF قد تكون ظهرت من قبل
        percentage1Element.textContent = "0%"; // إعادة تعيين النسبة المئوية إلى 0%
        percentage2Element.textContent = "0%"; // إعادة تعيين النسبة المئوية إلى 0%
        if (beatingHeart1) beatingHeart1.classList.remove("show");
        if (beatingHeart2) beatingHeart2.classList.remove("show");
        animatedName1.classList.remove("show");
        animatedName2.classList.remove("show");
      }
    });

    name1Input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        checkLoveBtn.click();
      }
    });

    name2Input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        checkLoveBtn.click();
      }
    });
  }

  // Animation for percentage numbers
  function animatePercentage(element, start, end, duration) {
    let startTime = null;
    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentValue = Math.floor(progress * (end - start) + start);
      if (element) {
        element.textContent = `${currentValue}%`;
      }
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }

  // Special Message Logic
  const passwordInput = document.getElementById("passwordInput");
  const unlockMessageBtn = document.getElementById("unlockMessageBtn");
  const passwordErrorMessage = document.getElementById("passwordErrorMessage");
  const secretContent = document.getElementById("secretContent");

  // IMPORTANT: CHANGE THIS PASSWORD TO YOUR SECRET PASSWORD
  const correctPassword = "10-6-21"; // قم بتغيير كلمة السر هذه هنا

  if (unlockMessageBtn) {
    unlockMessageBtn.addEventListener("click", () => {
      const enteredPassword = passwordInput.value.trim();

      if (enteredPassword === correctPassword) {
        passwordErrorMessage.classList.remove("show");
        passwordErrorMessage.textContent = "";
        secretContent.classList.add("show");
        passwordInput.value = ""; // مسح كلمة السر بعد الإدخال الصحيح
      } else {
        passwordErrorMessage.textContent = "Incorrect secret word. Try again!";
        passwordErrorMessage.classList.add("show");
        secretContent.classList.remove("show");
      }
    });

    passwordInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        unlockMessageBtn.click();
      }
    });
  }

  // Custom Audio Player Logic
  const audioPlayers = document.querySelectorAll(".audio-player-item");

  audioPlayers.forEach((playerItem) => {
    const audio = playerItem.querySelector("audio");
    const playPauseBtn = playerItem.querySelector(".play-pause-btn");
    const icon = playPauseBtn.querySelector(".icon");
    const progressBarContainer = playerItem.querySelector(
      ".progress-bar-container"
    );
    const progressBar = playerItem.querySelector(".progress-bar");
    const timeDisplay = playerItem.querySelector(".time-display");

    if (
      audio &&
      playPauseBtn &&
      progressBarContainer &&
      progressBar &&
      timeDisplay
    ) {
      // Initial time display
      audio.addEventListener("loadedmetadata", () => {
        timeDisplay.textContent = `0:00 / ${formatTime(audio.duration)}`;
      });

      // Play/Pause functionality
      playPauseBtn.addEventListener("click", () => {
        if (audio.paused) {
          // Pause all other audio players
          audioPlayers.forEach((otherPlayerItem) => {
            const otherAudio = otherPlayerItem.querySelector("audio");
            const otherIcon = otherPlayerItem.querySelector(
              ".play-pause-btn .icon"
            );
            if (otherAudio && otherAudio !== audio && !otherAudio.paused) {
              otherAudio.pause();
              otherIcon.textContent = "▶️"; // Set other icons to play
            }
          });

          audio.play();
          icon.textContent = "⏸️"; // Pause icon
        } else {
          audio.pause();
          icon.textContent = "▶️"; // Play icon
        }
      });

      // Update progress bar and time display
      audio.addEventListener("timeupdate", () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progress}%`;
        timeDisplay.textContent = `${formatTime(
          audio.currentTime
        )} / ${formatTime(audio.duration)}`;
      });

      // Handle song ending
      audio.addEventListener("ended", () => {
        icon.textContent = "▶️"; // Reset to play icon
        progressBar.style.width = "0%"; // Reset progress bar
        timeDisplay.textContent = `0:00 / ${formatTime(audio.duration)}`; // Reset time
        audio.currentTime = 0; // Reset audio to beginning
      });

      // Seek functionality (click on progress bar)
      progressBarContainer.addEventListener("click", (e) => {
        const clickX = e.offsetX; // X position of the click relative to the container
        const containerWidth = progressBarContainer.offsetWidth; // Total width of the container
        const seekTime = (clickX / containerWidth) * audio.duration;
        audio.currentTime = seekTime;
      });
    }
  });

  // Helper function to format time (e.g., 1:23)
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }
});
