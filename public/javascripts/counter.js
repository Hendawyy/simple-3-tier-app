document.addEventListener("DOMContentLoaded", function () {
  loadCounter();
});

async function loadCounter() {
  try {
    const response = await fetch("/api/counter");
    const data = await response.json();
    document.getElementById("counter").textContent = `Counter: ${data.counter}`;
  } catch (error) {
    console.error("Error loading counter:", error);
    document.getElementById("counter").textContent = "Counter: Error";
  }
}

async function updateCounter() {
  try {
    const response = await fetch("/api/counter/increment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    document.getElementById("counter").textContent = `Counter: ${data.counter}`;
  } catch (error) {
    console.error("Error updating counter:", error);
  }
}

async function resetCounter() {
  try {
    const response = await fetch("/api/counter/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    document.getElementById("counter").textContent = `Counter: ${data.counter}`;
  } catch (error) {
    console.error("Error resetting counter:", error);
  }
}
