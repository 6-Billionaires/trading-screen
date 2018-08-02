<template>
  <div class="page-container md-layout-row">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">My Title</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          Trade
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <md-button to="/trade/filter">FILTER</md-button>
          </md-list-item>

          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <md-button to="/trade/bsa">BSA</md-button>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <md-button to="/trade/boa">BOA</md-button>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <md-button to="/trade/soa">SOA</md-button>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <md-button to="/trade/ssa">SSA</md-button>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'PermanentFull'
}
</script>

<style lang="scss" scoped>
  .md-app {
    min-height: 350px;
    border: 1px solid rgba(#000, .12);
  }

  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

  .md-layout-row {

    min-height: 1000px;
  }
</style>
