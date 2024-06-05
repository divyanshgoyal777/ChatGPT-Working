document.addEventListener("DOMContentLoaded", () => {
    const generate = document.querySelector('#generate');
    const answer = document.getElementById("answer");
    const loading = document.getElementById("loading");
    const loadingSpinner = document.getElementById("loading-spinner");
    
    generate.addEventListener("click", () => {
        document.querySelector('.middle').style.display = "none";
        document.querySelector('.boxes').style.display = "none";
    });

    generate.addEventListener("click", async () => {
        const questionInput = document.getElementById("question");
        const question = questionInput.value.trim();
        if (question === "") {
            alert("Message box is empty");
            return;
        }

        loading.style.display = "block";
        loadingSpinner.style.display = "block";
        answer.style.display = "none";

        try {
            questionInput.value = "";
            const response = await fetch(`/generate?question=${encodeURIComponent(question)}`);
            const data = await response.json();
            answer.innerText = data.output;
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        } finally {
            loading.style.display = "none";
            loadingSpinner.style.display = "none";
            answer.style.display = "block";
        }
    });


    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-129%"
    });

    const copyTextToClipboard = (text) => {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
    };

    const handleCopyButtonClick = () => {
        const textToCopy = answer.innerText.trim();
        if (textToCopy) {
            copyTextToClipboard(textToCopy);
            alert("Text Copied!");
        }
    };

    const copyButton = document.getElementById("copy");
    copyButton.addEventListener("click", handleCopyButtonClick);
});
