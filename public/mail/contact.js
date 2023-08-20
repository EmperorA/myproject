// $(function () {
//   $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
//     preventSubmit: false,
//     submitError: function ($form, event, errors) {},
//     submitSuccess: function ($form, event) {
//       event.preventDefault();
//       var name = $("input#name").val();
//       var email = $("input#email").val();
//       var subject = $("input#subject").val();
//       var message = $("textarea#message").val();

//       $this = $("#sendMessageButton");
//       $this.prop("enabled", true);

//       $.ajax({
//         url: "/sendMessage",
//         type: "POST",
//         mail: {
//           name: name,
//           email: email,
//           subject: subject,
//           message: message,
//         },
//         cache: false,
//         success: function () {
//           $("#success").html("<div class='alert alert-success'>");
//           $("#success > .alert-success")
//             .html(
//               "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
//             )
//             .append("</button>");
//           $("#success > .alert-success").append(
//             "<strong>Your message has been sent. </strong>"
//           );
//           $("#success > .alert-success").append("</div>");
//           $("#contactForm").trigger("reset");
//         },
//         error: function () {
//           $("#success").html("<div class='alert alert-danger'>");
//           $("#success > .alert-danger")
//             .html(
//               "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
//             )
//             .append("</button>");
//           $("#success > .alert-danger").append(
//             $("<strong>").text(
//               "Sorry " +
//                 name +
//                 ", it seems that our mail server is not responding. Please try again later!"
//             )
//           );
//           $("#success > .alert-danger").append("</div>");
//           $("#contactForm").trigger("reset");
//         },
//         complete: function () {
//           setTimeout(function () {
//             $this.prop("disabled", false);
//           }, 1000);
//         },
//       });
//     },
//     filter: function () {
//       return $(this).is(":visible");
//     },
//   });

//   $('a[data-toggle="tab"]').click(function (e) {
//     e.preventDefault();
//     $(this).tab("show");
//   });
// });

// $("#name").focus(function () {
//   $("#success").html("");
// });

let contactForm = document.getElementById("contactForm");
const formEvent = contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  const mailer = {
    name: name,
    email: email,
    subject: subject,
    message: message,
  };

 
  fetch("/sendMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mailer }),
  })
    .then((response) => {
      if (response.ok) {
        alert("Thank you for your message. We will get back to you soon!");
        contactForm.reset();
      } else {
        alert("Something went wrong. Please try again later.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    });
});
