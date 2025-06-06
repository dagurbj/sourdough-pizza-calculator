<template>
<div class="slider-container">
  <div class="slider-header">
    <h2>Number of Pizzas</h2>
    <input type="number" v-model="numberOfPizzas" class="selected-number" min="1" @keyup.enter="removeFocus">
  </div>
  <input type="range" v-model="numberOfPizzas" min="1" max="20" step="1">
</div>

  <div class="slider-container">
    <div class="slider-header">
      <h2>Dough pr. Pizza</h2>
      <p class="selected-number">{{ ballSize }}g</p>
    </div>
    <input type="range" v-model="ballSize" min="200" max="350" step="1">
  </div>

  <div class="slider-container">
    <div class="slider-header">
      <h2>Salt</h2>
      <p class="selected-number">{{ saltPct }}%</p>
    </div>
    <input type="range" v-model="saltPct" min="0.0" max="3.5" step="0.1">
  </div>

  <div class="slider-container">
    <div class="slider-header">
      <h2>Hydration</h2>
      <p class="selected-number">{{ hydration }}%</p>
    </div>
    <input type="range" v-model="hydration" min="60" max="100" step="1">
  </div>

  <div class="slider-container">
    <div class="slider-header">
      <h2>Levain</h2>
      <p class="selected-number">{{ levain }}%</p>
    </div>
    <input type="range" v-model="levain" min="5" max="25" step="1">
  </div>

  <div class="reset-button-container">
    <button @click="resetToDefault" class="reset-button">Reset to Default</button>
  </div>
  
  <div id="sourdough-pizza-recipe" class="recipe">
    <h2>Sourdough Pizza Dough Recipe</h2>

    <h3>Ingredients:</h3>
    <ul>
        <li><span class="ingredient-quantity">{{ gramsFlour }}g</span> Pizza Flour <span class="ingredient-note">(such as Caputo Blue Pizzeria "00")</span></li>
        <li><span class="ingredient-quantity">{{ gramsLevain }}g</span> Levain <span class="ingredient-note">(Active sourdough starter)</span></li>
        <li><span class="ingredient-quantity">{{ gramsWater }}g</span> Water <span class="ingredient-note">(reserve {{ reservedWater }}g)</span></li>
        <li><span class="ingredient-quantity">{{ gramsSalt }}g</span> Salt <span class="ingredient-note">({{ saltPct }}% of the flour weight)</span></li>
        <li>Semola flour <span class="ingredient-note">(for dusting)</span></li>
    </ul>

    <h3>Equipment:</h3>
    <ul>
        <li>Stand mixer with a dough hook</li>
        <li>Bowl for resting dough</li>
        <li>Dough scraper for dividing and shaping</li>
        <li>Deli containers (for storing dough)</li>
    </ul>

    <h3>Steps:</h3>
    <ol>
        <li><b>Mixing Starter and Water:</b> In the bowl of your stand mixer, combine {{ gramsLevain }}g of sourdough starter with {{ (gramsWater - reservedWater) }}g of water.</li>
        <li><b>Hydrating Flour:</b> Using the dough hook attachment, gradually mix in the flour with the water until all the flour is hydrated.</li>
        <li><b>Resting the Dough (Autolyse):</b> Scrape down the sides of the bowl, cover, and let the dough rest for 30 minutes.</li>
        <li><b>Adding Salt and Reserved Water:</b> Mix {{ gramsSalt }}g of salt and the reserved {{ reservedWater }}g of water into the dough.</li>
        <li><b>Kneading:</b> Start the mixer on a slow speed, gradually increasing it until the dough comes together and releases from the sides of the bowl while still sticking to the bottom.</li>
        <li><b>First Rest and Folds:</b> Transfer the dough to a clean bowl. Perform two or three sets of stretch and folds, spacing each set 30-40 minutes apart.</li>
        <li><b>Coil Folds:</b> After the stretch and folds, do two sets of coil folds, also spaced 30-40 minutes apart.</li>
        <li><b>Bulk Fermentation:</b> Let the dough rise in a warm place until it's ready.</li>
        <li><b>Dividing the Dough:</b> Split the dough into {{ ballSize }}g balls and store them in individual deli containers. Refrigerate them overnight, or for optimal results, for at least two nights. The dough remains usable for up to five or six days.</li>
        <li><b>Shaping the Pizza Base:</b> When ready to use, carefully remove a dough ball from the container directly from the fridge. Dust it with Semola flour. Starting from the middle, gently push air bubbles towards the edges. Then, pick up the dough and carefully stretch it to size, focusing on stretching the edges rather than the middle.</li>
    </ol>
    <p><b>Note:</b></p>
    <ul>
      <li>The dough is best used with Caputo blue or purple (Nuvola) flour.</li>
      <li>I recommend substituting 10% of the pizza flour in your recipe with whole wheat flour.</li>
      <li>This recipe is a work in progress, and your feedback or questions are welcome.</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    let initialState = this.getDefaultState();

    for (const key in initialState) {
      const savedValue = localStorage.getItem(key);
      if (savedValue !== null) {
        initialState[key] = JSON.parse(savedValue);
      }
    }

    return initialState;
  },
  watch: {
    numberOfPizzas(newVal) {
      this.saveState('numberOfPizzas', newVal);
    },
    ballSize(newVal) {
      this.saveState('ballSize', newVal);
    },
    saltPct(newVal) {
      this.saveState('saltPct', newVal);
    },
    hydration(newVal) {
      this.saveState('hydration', newVal);
    },
    levain(newVal) {
      this.saveState('levain', newVal);
    }
  },
  computed: {
    totalDough() {
      return Math.round(this.numberOfPizzas * this.ballSize);
    },
    gramsFlour() {
      return Math.round(this.numberOfPizzas * (this.ballSize - this.ballSize * this.levain / 100) / (this.saltPct / 100 + this.hydration / 100 + 1));
    },
    gramsLevain() {
      return Math.round(-(2 * this.gramsFlour * this.levain / 100) / (this.levain / 100 - 1));
    },
    gramsWater() {
      return Math.round(this.gramsFlour * this.hydration / 100 + 0.5 * (-(2 * this.gramsFlour * this.levain / 100) / (this.levain / 100 - 1)) * (this.hydration / 100 - 1));
    },
    reservedWater() {
      return Math.ceil((this.gramsWater * 0.05) / 10) * 10;
    },
    gramsSalt() {
      return Math.round(this.saltPct / 100 * (this.gramsFlour + (- (2 * this.gramsFlour * this.levain / 100) / (this.levain / 100 - 1)) / 2));
    }
  },
  methods: {
    removeFocus(event) {
      event.target.blur(); // Remove focus from input field on Enter
    },
    saveState(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    loadState(key, defaultValue) {
      const savedValue = localStorage.getItem(key);
      return savedValue !== null ? JSON.parse(savedValue) : defaultValue;
    },
    getDefaultState() {
      return {
        numberOfPizzas: 4,
        ballSize: 240,
        saltPct: 2,
        hydration: 70,
        levain: 10,
      };
    },
    resetToDefault() {
      Object.assign(this.$data, this.getDefaultState());
    }
  }
};
</script>

<style>
:root {
  --text-color: #3C3C3C; /* Dark text color */
  --background-light: #FFF8E7; /* Light cream background */
  --background-off-white: #FFFAF0; /* Off-white background */
  --highlight-color: #D35400; /* Rich orange highlight color */
  --slider-track-color: #C0392B; /* Tomato red slider track */
  --slider-thumb-color: #F1C40F; /* Cheese yellow slider thumb */
  --note-color: #686868; /* Softer color for notes */
}

/* Global Styles */
body {
  font-family: 'Roboto', sans-serif;
  color: var(--text-color);
  background-color: var(--background-light);
  margin: 0;
  padding: 20px;
  text-align: center;
}

#app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--background-off-white);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

h2, .recipe h2, .recipe h3 {
  color: var(--highlight-color);
}

/* Slider Container */
.slider-container {
  margin-bottom: 30px;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.slider-header h2 {
  margin: 0;
}

/* Shared Styles for Selected Number and Button */
.selected-number, .reset-button {
  padding: 3px 6px; /* Reduced padding */
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  color: var(--highlight-color);
  text-align: center;
  cursor: pointer;
}

.selected-number {
  margin: 0;
  width: 60px; /* Specific to the input box */
  text-align: right;
  font-size: 1em; /* Original font size for the input */
}

/* Reset to Defualt Button */
.reset-button-container {
  text-align: right;
  margin-bottom: 20px;
}

.reset-button {
  font-size: 0.8em; /* Smaller font size for the button */
}

.reset-button:hover {
  background-color: #e6e6e6;
}

/* Base Styles */
input[type="range"] {
  -webkit-appearance: none; /* For WebKit-based browsers */
  -moz-appearance: none;    /* For Firefox */
  appearance: none;         /* Standard */
  width: 100%;
  margin: 15px 0;
  outline: none;
}

/* WebKit Slider Track */
input[type="range"]::-webkit-slider-runnable-track {
  height: 8px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000; /* Match earlier shadow */
  background: var(--slider-track-color);
  border-radius: 4px;
  border: 1px solid #000000;
  transition: background-color 0.2s ease;
}

/* WebKit Slider Thumb */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  box-shadow: 1px 1px 1px #000000; /* Match earlier shadow */
  border: 1px solid #000000;
  height: 24px;
  width: 24px;
  border-radius: 12px;
  background: var(--slider-thumb-color);
  cursor: pointer;
  margin-top: -8px;
}

/* Firefox Slider Track */
input[type="range"]::-moz-range-track {
  height: 8px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000; /* Match earlier shadow */
  background: var(--slider-track-color);
  border-radius: 4px;
  border: 1px solid #000000;
  transition: background-color 0.2s ease;
}

/* Firefox Slider Thumb */
input[type="range"]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000; /* Match earlier shadow */
  border: 1px solid #000000;
  height: 24px;
  width: 24px;
  border-radius: 12px;
  background: var(--slider-thumb-color);
  cursor: pointer;
}

/* Edge (Legacy) Slider Track */
input[type="range"]::-ms-track {
  height: 8px;
  cursor: pointer;
  background: transparent; /* Transparent to avoid default styles */
  border-color: transparent;
  border-width: 6px 0;
  color: transparent;
}
input[type="range"]::-ms-fill-lower {
  background: var(--slider-track-color);
  border-radius: 4px;
  box-shadow: 1px 1px 1px #000000; /* Match earlier shadow */
}
input[type="range"]::-ms-fill-upper {
  background: var(--slider-track-color);
  border-radius: 4px;
  box-shadow: 1px 1px 1px #000000; /* Match earlier shadow */
}
input[type="range"]::-ms-thumb {
  box-shadow: 1px 1px 1px #000000; /* Match earlier shadow */
  border: 1px solid #000000;
  height: 24px;
  width: 24px;
  border-radius: 12px;
  background: var(--slider-thumb-color);
  cursor: pointer;
}

/* Recipe Styling */
.ingredient-quantity {
  font-weight: bold;
}

.ingredient-note {
  font-style: italic;
  color: var(--note-color);
  font-size: 0.9em;
}

.recipe {
  text-align: left;
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: var(--background-light);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.recipe ul, .recipe ol {
  padding-left: 20px;
}

.recipe li {
  margin-bottom: 5px;
}

.recipe p {
  color: var(--text-color);
}
</style>

