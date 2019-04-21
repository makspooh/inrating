<template>
  <div id="app">
    <v-toolbar flat color="white">
      <router-link :to="'/'"><v-toolbar-title>Main</v-toolbar-title></router-link>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-flex xs12 sm6>
        <v-text-field
          label="Add JSON text"
          single-line
          v-model="newPerson"
        ></v-text-field>
      </v-flex>
      <v-btn @click="addPerson" color="success">add users</v-btn>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" @click="editedIndex = -1" v-on="on">New Item</v-btn>
        </template>
        <v-card>

          <v-card-text
            :items="people">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.surname" label="Surname"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.phone" label="Phone"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="addByForm">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="removePerson(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editedItem: {
        name: '',
        surname: '',
        phone: '',
        email: '',
      },
      editedIndex: -1,
      people: [],
      newPerson: null,
      dialog: false
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
  },
  methods: {
    addPerson() {
      let parse = JSON.parse(this.newPerson)
      
      if (parse.length >= 1) {
        for (let i = 0; i < parse.length; i++) {
          this.people.push({"name": parse[i].name, "surname": parse[i].surname, "phone": parse[i].phone, "email": parse[i].email})
        }
      } else {
        this.people.push({"name": parse.name, "surname": parse.surname, "phone": parse.phone, "email": parse.email})
      }

      this.newPerson = ''
      this.savePeople()
    },
    addByForm() {
      if(this.editedIndex > -1) {
        Object.assign(this.people[this.editedIndex], this.editedItem)
        this.savePeople()
        this.dialog = false
      } else {
        this.people.push({"name": this.editedItem.name, "surname": this.editedItem.surname, "phone": this.editedItem.phone, "email": this.editedItem.email})
        this.dialog = false,
        this.savePeople()
      }
    },
    savePeople() {
      const parsed = JSON.stringify(this.people);
      this.$ls.set('people', parsed);
    },
    removePerson(item) {
      const index = this.people.indexOf(item)
      this.people.splice(index, 1);
      this.savePeople();
    },
    editItem(item) {
      this.editedIndex = this.people.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
  }
}
</script>

<style>
  #input-usage .v-input__prepend-outer,
  #input-usage .v-input__append-outer,
  #input-usage .v-input__slot,
  #input-usage .v-messages {
    border: 1px dashed rgba(0,0,0, .4);
  }
</style>