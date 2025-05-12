<template>
  <div id="app">
    <nav>
      <router-link to="/" class="nav-button" active-class="active" exact>Pizza Calculator</router-link>
      <router-link to="/bread" class="nav-button" active-class="active">Bread Calculator</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
}
.nav-button {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 8px 16px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  color: #D35400;
  font-weight: bold;
  text-decoration: none;
}
.nav-button.active {
  background-color: #D35400;
  color: white;
  border-color: #a34200;
}
</style>
