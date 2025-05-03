const chatBox = document.getElementById("chat-box");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
let quizActive = false;
let quizScore = 0;

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const msg = input.value.trim();

    if (msg === "") return;

    addMessage("Você", msg);
    handleCommand(msg.toLowerCase());
    input.value = "";
});

function addMessage(sender, text) {
    const p = document.createElement("p");
    p.classList.add("chat-message", "mb-2");
    p.innerHTML = `<strong>${sender}:</strong> ${text}`;

    if (sender === "Bot") {
        p.style.color = "#e0e0e0";
        p.style.backgroundColor = "#2a2a2a";
        p.style.padding = "6px";
        p.style.borderRadius = "4px";
    }

    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleCommand(cmd) {
    if (cmd === "/jogos") {
        addMessage("Bot", "Próximos jogos: FURIA vs. MIBR - 03/05 às 18h 🕒 | FURIA vs. NIP - 05/05 às 20h 🎮");
    } else if (cmd === "/stats") {
        addMessage("Bot", "Estatísticas: win rate 57% 📊, mapa favorito: Mirage 🗺️, melhor jogador: KSCERATO 🌟");
    } else if (cmd === "/fallen" || cmd === "/falleN") {
        addMessage("Bot", "FalleN: IGL da FURIA, bicampeão de Major 🏆, conhecido como Professor 👨‍🏫");
    } else if (cmd === "/quiz") {
        quizActive = true;
        quizScore = 0;
        startQuiz();
    } else if (quizActive) {
        checkQuizAnswer(cmd);
    } else {
        addMessage("Bot", "Comando não reconhecido. Tente /jogos, /stats, /falleN ou /quiz 🤔.");
    }
}

function startQuiz() {
    const questions = [
        { question: "Quem é o IGL da FURIA? (responda com o nome)", answer: "fallen" },
        { question: "Qual o mapa favorito da FURIA? (responda com o nome)", answer: "mirage" },
        { question: "Quantos Majors a FURIA venceu? (responda com o número)", answer: "2" }
    ];
    let currentQuestion = 0;

    function askQuestion() {
        if (currentQuestion < questions.length) {
            addMessage("Bot", `Quiz! Pergunta ${currentQuestion + 1}/${questions.length}: ${questions[currentQuestion].question} 📝`);
        } else {
            quizActive = false;
            addMessage("Bot", `Fim do quiz! Sua pontuação: ${quizScore}/${questions.length} 🎉`);
        }
    }

    askQuestion();

    // Função para verificar resposta
    window.checkQuizAnswer = function (answer) {
        if (currentQuestion < questions.length) {
            if (answer === questions[currentQuestion].answer) {
                quizScore++;
                addMessage("Bot", "Correto! +1 ponto! ✅");
            } else {
                addMessage("Bot", `Errado! A resposta correta era ${questions[currentQuestion].answer}. ❌`);
            }
            currentQuestion++;
            askQuestion();
        }
    };
}

document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.querySelector(".chat-container");

    const welcomeMessage = document.createElement("p");
    welcomeMessage.textContent = "👋 Bem-vindo ao FURIA Fan Chat! Digite um comando como /jogos, /stats, /fallen ou /quiz";
    welcomeMessage.style.color = "#00ffcc";

    chatContainer.appendChild(welcomeMessage);

    // Funcionalidade dos botões rápidos
    const quickButtons = document.querySelectorAll(".quick-btn");
    quickButtons.forEach(button => {
        button.addEventListener("click", () => {
            const command = button.getAttribute("data-command");
            input.value = command;
            form.dispatchEvent(new Event("submit"));
        });
    });
});