document.addEventListener("DOMContentLoaded", function () {
    const dobInput = document.getElementById("dob");
    const ageInput = document.getElementById("age");

    dobInput.addEventListener("change", function () {
        const dobValue = dobInput.value;
        console.log("Raw DOB value:", dobValue); // yyyy-mm-dd format hona chahiye

        if (dobValue) {
            const dob = new Date(dobValue);
            console.log("Parsed DOB:", dob);

            if (!isNaN(dob.getTime())) {  // ✅ yaha fix
                const today = new Date();
                let age = today.getFullYear() - dob.getFullYear();
                const m = today.getMonth() - dob.getMonth();

                if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
                    age--;
                }

                console.log("Calculated Age:", age);
                ageInput.value = age;
            } else {
                console.error("Invalid DOB format ❌");
                ageInput.value = "";
            }
        } else {
            console.warn("DOB field is empty ❌");
            ageInput.value = "";
        }
    });
});
