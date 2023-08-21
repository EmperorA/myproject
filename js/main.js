(function ($) {
  "use strict";

  // Dropdown on mouse hover
  $(document).ready(function () {
    function toggleNavbarMethod() {
      if ($(window).width() > 992) {
        $(".navbar .dropdown")
          .on("mouseover", function () {
            $(".dropdown-toggle", this).trigger("click");
          })
          .on("mouseout", function () {
            $(".dropdown-toggle", this).trigger("click").blur();
          });
      } else {
        $(".navbar .dropdown").off("mouseover").off("mouseout");
      }
    }
    toggleNavbarMethod();
    $(window).resize(toggleNavbarMethod);
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Vendor carousel
  $(".vendor-carousel").owlCarousel({
    loop: true,
    margin: 29,
    nav: false,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 2,
      },
      576: {
        items: 3,
      },
      768: {
        items: 4,
      },
      992: {
        items: 5,
      },
      1200: {
        items: 6,
      },
    },
  });

  // Related carousel
  $(".related-carousel").owlCarousel({
    loop: true,
    margin: 29,
    nav: false,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
    },
  });

  // Product Quantity
  // $(".quantity button").on("click", function () {
  //   var button = $(this);
  //   var oldValue = button.parent().parent().find("input").val();
  //   if (button.hasClass("btn-plus")) {
  //     var newVal = parseFloat(oldValue) + 1;
  //   } else {
  //     if (oldValue > 0) {
  //       var newVal = parseFloat(oldValue) - 1;
  //     } else {
  //       newVal = 0;
  //     }
  //   }
  //   button.parent().parent().find("input").val(newVal);
  // });
})(jQuery);

// register functionality

const form = document.querySelector("form").value;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const display = document.querySelector(".error").value;

  const userData = {
    username: username,
    password: password,
  };

  display.textContent = "";
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userData }),
    });
    const data = await res.json();
    if (res.status === 400 || res.status === 401) {
      return (display.textContent = `${data.message}. ${
        data.error ? data.error : ""
      }`);
    }
    data.role === "admin"
      ? location.assign("/admin")
      : location.assign("/basic");
  } catch (err) {
    console.log(err.message);
  }
});

// login functionality

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  display.textContent = "";
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        userData,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (res.status === 400 || res.status === 401) {
      return (display.textContent = `${data.message}. ${
        data.error ? data.error : ""
      }`);
    }
    data.role === "admin"
      ? location.assign("/admin")
      : location.assign("/basic");
  } catch (err) {
    console.log(err.message);
  }
});

//   user JS functionality

// const ul = document.querySelector("ul");
// const getUsers = async () => {
//   const res = await fetch("/api/auth/getUsers");
//   const data = await res.json();
//   data.user.map((mappedUser) => {
//     if (mappedUser.username !== "admin") {
//       let li = `<li> <b>Username</b> => ${mappedUser.username} <br> <b>Role</b> => ${mappedUser.role} </li> <button class="edit">Edit Role</button> <button class="delete">Delete User</button>`;
//       ul.innerHTML += li;
//     } else {
//       return null;
//     }
//   });
// };
// getUsers();

// update and delete fuunctionality

const editRole = document.querySelectorAll(".edit");
const deleteUser = document.querySelector(".delete");

editRole.forEach((button, i) => {
  button.addEventListener("click", async () => {
    display.textContent = "";
    const id = data.user[i + 1].id;
    const res = await fetch("/api/auth/update", {
      method: "PUT",
      body: JSON.stringify({ role: "admin", id }),
      headers: { "Content-Type": "application/json" },
    });
    const dataUpdate = await res.json();
    if (res.status === 400 || res.status === 401) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      return (display.textContent = `${dataUpdate.message}. ${
        dataUpdate.error ? dataUpdate.error : ""
      }`);
    }
    location.assign("/admin");
  });
});

deleteUser.forEach((button, i) => {
  button.addEventListener("click", async () => {
    display.textContent = "";
    const id = data.user[i + 1].id;
    const res = await fetch("/api/auth/deleteUser", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    const dataDelete = await res.json();
    if (res.status === 401) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      return (display.textContent = `${dataUpdate.message}. ${
        dataUpdate.error ? dataUpdate.error : ""
      }`);
    }
    location.assign("/admin");
  });
});
