<template>
  <div class="slider-container">
    <div class="slider-header">
      <h2>Number of Loaves</h2>
      <input type="number" v-model="numberOfLoaves" class="selected-number" min="1" @keyup.enter="removeFocus">
    </div>
    <input type="range" v-model="numberOfLoaves" min="1" max="10" step="1">
  </div>

  <div class="slider-container">
    <div class="slider-header">
      <h2>Flour per Loaf</h2>
      <p class="selected-number">{{ flourPerLoaf }}g</p>
    </div>
    <input type="range" v-model="flourPerLoaf" min="300" max="800" step="10">
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

  <div id="sourdough-bread-recipe" class="recipe">
    <h2>Sourdough Bread Recipe (Tartine Style)</h2>
    <h3>Ingredients:</h3>
    <ul>
      <li><span class="ingredient-quantity">{{ totalFlour }}g</span> Bread Flour</li>
      <li><span class="ingredient-quantity">{{ gramsLevain }}g</span> Levain (Active sourdough starter)</li>
      <li><span class="ingredient-quantity">{{ gramsWater }}g</span> Water</li>
      <li><span class="ingredient-quantity">{{ gramsSalt }}g</span> Salt</li>
    </ul>

    <h3>Equipment:</h3>
    <ul>
      <li>Mixing bowl</li>
      <li>Dutch oven or baking stone</li>
      <li>Dough scraper</li>
      <li>Kitchen scale</li>
      <li>Proofing basket (banneton)</li>
    </ul>

    <h3>Steps:</h3>
    <ol>
      <li><b>Mix Levain and Water:</b> Combine levain with water until mixed.</li>
      <li><b>Add Flour:</b> Mix in the bread flour until fully hydrated (autolyse for 30-60 minutes).</li>
      <li><b>Add Salt:</b> Add salt and mix into dough.</li>
      <li><b>Knead and Bulk Ferment:</b> Knead or stretch and fold the dough. Bulk ferment for 3-4 hours with stretch
        and folds every 30-40 minutes.</li>
      <li><b>Shape and Proof:</b> Shape loaves and proof for 2-3 hours or refrigerated overnight.</li>
      <li><b>Bake:</b> Bake in a preheated Dutch oven or on a baking stone at 230°C (450°F) until crusty and hollow
        sounding.</li>
    </ol>

    <p><b>Notes:</b></p>
    <ul>
      <li>This recipe follows the Tartine bread methodology.</li>
      <li>You can adjust hydration and levain for different results.</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BreadCalculator',
  data() {
    let initialState = this.getDefaultState();

    for (const key in initialState) {
      const savedValue = localStorage.getItem('bread_' + key);
      if (savedValue !== null) {
        initialState[key] = JSON.parse(savedValue);
      }
    }

    return initialState;
  },
  watch: {
    numberOfLoaves(newVal) {
      this.saveState('numberOfLoaves', newVal);
    },
    flourPerLoaf(newVal) {
      this.saveState('flourPerLoaf', newVal);
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
    totalFlourAllIncl() {
      return Math.round((this.numberOfLoaves * this.flourPerLoaf));
    },
    gramsLevain() {
      return Math.round(this.totalFlourAllIncl * 2 * this.levain / 100);
    },
    totalFlour() {
      const flourInLevain = this.gramsLevain / 2;
      return Math.round(this.totalFlourAllIncl - flourInLevain);
    },
    gramsWater() {
      const waterInLevain = this.gramsLevain / 2;
      const totalWater = this.totalFlourAllIncl * this.hydration / 100;
      return Math.round(totalWater - waterInLevain);
    },
    gramsSalt() {
      return Math.round(this.totalFlourAllIncl * this.saltPct / 100);
    }
  },
  methods: {
    removeFocus(event) {
      event.target.blur();
    },
    saveState(key, value) {
      localStorage.setItem('bread_' + key, JSON.stringify(value));
    },
    loadState(key, defaultValue) {
      const savedValue = localStorage.getItem('bread_' + key);
      return savedValue !== null ? JSON.parse(savedValue) : defaultValue;
    },
    getDefaultState() {
      return {
        numberOfLoaves: 1,
        flourPerLoaf: 500,
        saltPct: 2,
        hydration: 75,
        levain: 20,
      };
    },
    resetToDefault() {
      Object.assign(this.$data, this.getDefaultState());
    }
  }
};
</script>

<style scoped>
.selected-number,
.reset-button {
  padding: 3px 6px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  color: #D35400;
  text-align: center;
  cursor: pointer;
}

.reset-button-container {
  text-align: right;
  margin-bottom: 20px;
}

.reset-button {
  font-size: 0.8em;
}

.reset-button:hover {
  background-color: #e6e6e6;
}
</style>
