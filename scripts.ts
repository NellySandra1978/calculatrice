// Récupération des éléments
const display = document.getElementById('display') as HTMLInputElement;
const sciButtons = document.getElementById('sci-buttons') as HTMLElement;

// Fonction pour ajouter une valeur au display
function append(value: string): void {
  display.value += value;
}

// Fonction pour effacer le display
function clearDisplay(): void {
  display.value = '';
}

// Fonction pour calculer l'expression
function calculate(): void {
  try {
    if (display.value.trim() === '') {
      display.value = '0';
      return;
    }
    // ⚠️ eval utilisé ici car simple, mais à sécuriser pour un vrai projet
    const result = eval(display.value) as number;
    display.value = result.toString();
  } catch (e) {
    display.value = 'Erreur';
  }
}

// Fonction pour afficher/masquer la partie scientifique
function toggleScientific(): void {
  sciButtons.classList.toggle('active');
}

// Fonction pour appliquer une fonction scientifique
function applyFunc(func: string): void {
  const value = display.value;
  try {
    if (value.trim() === '') return;

    const numValue = eval(value) as number;
    let result: number;

    switch (func) {
      case 'sin':
        result = Math.sin(toRadians(numValue));
        break;
      case 'cos':
        result = Math.cos(toRadians(numValue));
        break;
      case 'tan':
        result = Math.tan(toRadians(numValue));
        break;
      case 'sqrt':
        result = Math.sqrt(numValue);
        break;
      case 'pi':
        display.value += Math.PI.toString();
        return;
      default:
        return;
    }

    display.value = result.toString();
  } catch (e) {
    display.value = 'Erreur';
  }
}

// Convertir degrés → radians
function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

// ---- Ajout automatique des événements sur les boutons numériques et opérateurs ----
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.buttons button');
  buttons.forEach((btn) => {
    const text = btn.textContent?.trim() || '';

    if (text === '=') {
      btn.addEventListener('click', calculate);
    } else if (text === 'C') {
      btn.addEventListener('click', clearDisplay);
    } else {
      btn.addEventListener('click', () => append(text));
    }
  });

  // Boutons supplémentaires (parenthèses et π dans la partie scientifique)
  const sciExtraBtns = sciButtons.querySelectorAll('button');
  sciExtraBtns.forEach((btn) => {
    const text = btn.textContent?.trim() || '';

    if (text === 'π') {
      btn.addEventListener('click', () => applyFunc('pi'));
    } else if (text === '(' || text === ')') {
      btn.addEventListener('click', () => append(text));
    }
  });
});
