const passwordText = document.getElementById("passwordText");
const copyBtn = document.getElementById("copyBtn");
const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");
const generateBtn = document.getElementById("generateBtn");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const strengthBars = document.querySelectorAll(".strength-bar");

const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

lengthSlider.addEventListener("input", (e) => {
  lengthValue.textContent = e.target.value;
});

function generatePassword() {
  let charset = "";
  let password = "";

  if (uppercase.checked) charset += uppercaseChars;
  if (lowercase.checked) charset += lowercaseChars;
  if (numbers.checked) charset += numberChars;
  if (symbols.checked) charset += symbolChars;

  if (charset === "") {
    alert("Por favor, selecciona al menos una opción");
    return;
  }

  const length = parseInt(lengthSlider.value);

  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  passwordText.textContent = password;
  updateStrength();
}

function updateStrength() {
  let strength = 0;
  const length = parseInt(lengthSlider.value);
  const checkedOptions = [
    uppercase.checked,
    lowercase.checked,
    numbers.checked,
    symbols.checked,
  ].filter(Boolean).length;

  if (length >= 8) strength++;
  if (length >= 12) strength++;
  if (checkedOptions >= 3) strength++;
  if (checkedOptions === 4 && length >= 16) strength++;

  strengthBars.forEach((bar, index) => {
    if (index < strength) {
      bar.classList.add("active");
    } else {
      bar.classList.remove("active");
    }
  });
}

copyBtn.addEventListener("click", () => {
  const text = passwordText.textContent;
  navigator.clipboard.writeText(text).then(() => {
    const originalColor = copyBtn.style.color;
    copyBtn.style.color = "#a8ff9e";
    setTimeout(() => {
      copyBtn.style.color = originalColor;
    }, 300);
  });
});

generateBtn.addEventListener("click", generatePassword);

[uppercase, lowercase, numbers, symbols].forEach((checkbox) => {
  checkbox.addEventListener("change", updateStrength);
});

lengthSlider.addEventListener("input", updateStrength);

generatePassword();
