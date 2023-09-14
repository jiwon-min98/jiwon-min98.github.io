function calculateAge(year, month, day) {
    const today = new Date();
    const birthDate = new Date(year, month, day);
  
    let yearsDiff = today.getFullYear() - birthDate.getFullYear();
    let monthsDiff = today.getMonth() - birthDate.getMonth();
    let daysDiff = today.getDate() - birthDate.getDate();
  
    // Adjust for negative months or days difference
    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
      yearsDiff--;
      if (monthsDiff <= 0) {
        monthsDiff += 12;
      }
    }
    if (daysDiff < 0) {
      const lastMonthDate = new Date(today.getFullYear(), today.getMonth(), 0);
      daysDiff += lastMonthDate.getDate();
      monthsDiff -= monthsDiff === 0 ? 0 : 1;
    }
  
    return {
      years: yearsDiff,
      months: monthsDiff,
      days: daysDiff
    };
  }
  
  function setErrorField(parentEl, childEl, errorEl, errorMsg) {
    errorEl.textContent = errorMsg;
    parentEl.appendChild(errorEl);
    childEl.style.border = "1px solid #ff5757"
    parentEl.querySelector("label").style.color = "#ff5757";
  
    return false;
  }
  
  function validate(elements) {
    const today = new Date();
    let isValid = true;
    let lastMonthDay = 31;
  
    Object.values(elements).map((el) => {
      const parentEl = el.parentElement;
  
      const errorEl = document.createElement("div");
      errorEl.classList.add("error-msg");
  
      if (!el.value) {
        isValid = false;
        if (!parentEl.querySelector("div")) {
          setErrorField(parentEl, el, errorEl, "This field is required");
        }
      } else if (el.value && parentEl.querySelector("div")) {
        parentEl.querySelector("div").remove();
        el.style.border = "1px solid #dbdbdb"
        parentEl.querySelector("label").style.color = "#716f6f";
      }
      if (el.value) {
        let id = el.getAttribute("id");
        if (id === "month" && el.value > 0 && el.value < 12) {
          if (elements.year.value) {
            lastMonthDay = new Date(elements.year.value, el.value, 0).getDate();
          }
        }
  
        if (id === "day" && (el.value <= 0 || el.value > lastMonthDay)) {
          isValid = setErrorField(parentEl, el, errorEl, "Must be a valid day");
        } else if (id === "month" && (el.value <= 0 || el.value > 12)) {
          isValid = setErrorField(parentEl, el, errorEl, "Must be a valid month");
        } else if (id === "year" && (el.value <= 0 || el.value > today.getFullYear())) {
          isValid = setErrorField(parentEl, el, errorEl, "Must be in the past");
        }
      }
    })
  
    return isValid;
  }
  
  
  const birthdayForm = document.getElementById("date-input");
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const fieldElements = {
      'year': document.getElementById("year"),
      'month': document.getElementById("month"),
      'day': document.getElementById("day")
    }
  
    if (!validate(fieldElements)) {
      return false;
    }
  
    const [year, month, day] = [
      parseInt(fieldElements.year.value),
      parseInt(fieldElements.month.value) - 1,
      parseInt(fieldElements.day.value)
    ]
  
    const { years, months, days } = calculateAge(year, month, day);
  
    document.getElementById("years").textContent = years;
    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days;
  }
  
  birthdayForm.addEventListener("submit", handleSubmit)