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
      <li><b>Mix Levain and Water:</b> In a large bowl, combine levain with most of the water (reserve 30-50 g). Stir
        until the levain is fully dissolved.</li>

      <li><b>Add Flour:</b> Add the bread flour and mix until no dry spots remain. The dough will be rough and shaggy.
        Cover and let rest for <i>30-60 minutes</i> for the <b>autolyse</b>.</li>

      <li><b>Add Salt and Reserved Water:</b> Sprinkle salt over the dough and pour in the reserved water. Mix
        thoroughly by squeezing and folding until fully incorporated and the dough tightens slightly.</li>

      <li><b>Knead and Bulk Ferment:</b> Begin bulk fermentation. Over the next <i>3-4 hours</i>, perform
        stretch-and-folds or coil folds every <i>30-40 minutes</i> to strengthen the dough. Keep covered between folds.
      </li>

      <li><b>Shape and Proof:</b> After bulk fermentation, pre-shape the dough and let rest for 20 minutes. Shape into a
        round or batard and place in a floured proofing basket. Proof for <i>2-3 hours</i> at room temperature or
        refrigerate overnight.</li>

      <li><b>Bake:</b> Preheat oven to <b>260 °C</b> with a Dutch oven inside. Transfer dough to parchment, score the
        surface, and place in the hot Dutch oven. Bake <b>covered for 20 minutes at 260 °C</b>, then <b>uncovered for 10
          minutes at 230 °C</b> or until deeply browned and hollow sounding.</li>

      <li><b>Cool:</b> Let the bread cool completely on a wire rack for at least <i>1 hour</i> before slicing to allow
        the crumb to set.</li>
    </ol>


    <p><b>Notes:</b></p>
    <ul>
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
