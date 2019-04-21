<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Main</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <router-link :to="'/edit'">
        <v-btn color="success">add user</v-btn>
      </router-link>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="people"
      class="elevation-1"
      hide-actions
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.surname }}</td>
        <td>{{ props.item.phone }}</td>
        <td>{{ props.item.email }}</td>
      </template>
    </v-data-table>
    <v-btn color="error">delete</v-btn>
    <router-link :to="'/edit'">
      <v-btn color="primary">edit</v-btn>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      people: [],
    }
  },
  computed: {
    headers() {
      return this.$store.state.headers
    }
  },
    mounted() {
    if (this.$ls.get('people')) {
      try {
        this.people = JSON.parse(this.$ls.get('people'));
      } catch(e) {
        this.$ls.remove('people');
      }
    }
  }
}
</script>

<style>
  a {
    text-decoration: none;
  }
</style>
