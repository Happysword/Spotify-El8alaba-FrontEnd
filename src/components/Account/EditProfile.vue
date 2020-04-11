<template>
<v-app>
<v-content class="grey lighten-4 pa-8">
<!-- Root Container -->
<v-container id="EditProfile_root">
  <p id="title"
     class="spotify-green headline pt-6 pl-3 mb-12">
    Edit Profile
  </p>

  <v-card flat id="formCard">
    <!-- Error bar -->
    <p
      id="errorBar"
      class="caption red darken-1 white--text text-center py-3 mb-8"
      v-if="userInput.incorrect"
      >Error. Please enter valid data.
    </p>

    <!-- Form -->
    <v-form class="py-12 px-12" ref="editProfileForm">
      <!-- Name -->
      <v-text-field id="nameField"
                    color="#1DB954"
                    outlined
                    label="Name"
                    v-model="userInput.name"
                    :rules="[validation.noSpecialCharacters('Name', true)]"/>

      <!-- Gender -->
      <v-select id="genderSelect"
                color="#1DB954"
                label="Gender"
                :items="genders"
                v-model="userInput.gender"
                outlined/>

      <!-- Date of Birth -->
      <p class="subtitle-2 grey--text text--darken-1">Date of Birth</p>
      <v-row class="mt-n6 mb-n4">
        <!-- Day -->
        <v-col cols="3">
          <v-text-field id="dobDayField"
                        color="#1DB954"
                        outlined
                        label="Day"
                        v-model="userInput.dob.day"
                        :rules="[validation.validDay(true)]"/>
        </v-col>
        <!-- Month -->
        <v-col>
          <v-select id="dobMonthSelect"
                    color="#1DB954"
                    outlined
                    label="Month"
                    :items="months"
                    v-model="userInput.dob.month"/>
        </v-col>
        <!-- Year -->
        <v-col cols="3">
          <v-text-field id="dobYearField"
                        color="#1DB954"
                        outlined
                        label="Year"
                        v-model="userInput.dob.year"
                        :rules="[validation.validYear(true)]"/>
        </v-col>
      </v-row>

      <!-- Country -->
      <v-select id="countrySelect"
                color="#1DB954"
                label="Country"
                :items="countries"
                v-model="userInput.country"
                outlined/>

      <!-- Mobile Phone Number -->
      <v-text-field id="phoneField"
                    color="#1DB954"
                    outlined
                    placeholder="+201XXXXXXXXX"
                    label="Mobile Phone Number"
                    v-model="userInput.phoneNumber"
                    :rules="[validation.validMobilePhoneNumber(true)]"/>
      <v-row justify="end">
        <router-link to="/account/overview">
          <v-btn id="cancelBtn"
                 class="mr-4" text rounded>
            Cancel
          </v-btn>
        </router-link>
        <v-btn id="saveBtn"
               class="mr-4" color="#1DB954" rounded dark
               @click="submit">
          Save Profile
        </v-btn>
      </v-row>
    </v-form>
  </v-card>

</v-container>
</v-content>
</v-app>
</template>

<script>
import validation from '@/store/modules/auth/validation';
import api from 'api-client';

/**
 * @author XL3 <abdelrahman.farid99@eng-st.cu.edu.eg>
 */
export default {
  name: 'EditProfile',
  /* istanbul ignore next */
  // Re-route to login if no user is logged in
  beforeRouteEnter(to, from, next) {
    next(() => {
      // Find the loggedIn cookie
      const notLoggedIn = document.cookie.search(/loggedIn=.+/) === -1;

      if (notLoggedIn) {
        next('/login');
      } else {
        next();
      }
    });
  },
  data: () => ({
    months: [
      { text: 'January', value: '01' },
      { text: 'February', value: '02' },
      { text: 'March', value: '03' },
      { text: 'April', value: '04' },
      { text: 'May', value: '05' },
      { text: 'June', value: '06' },
      { text: 'July', value: '07' },
      { text: 'August', value: '08' },
      { text: 'September', value: '09' },
      { text: 'October', value: '10' },
      { text: 'November', value: '11' },
      { text: 'December', value: '12' },
    ],
    genders: [
      { text: 'Male', value: 'm' },
      { text: 'Female', value: 'f' },
    ],
    // @todo[XL3] Add more countries
    countries: [
      { text: 'Egypt', value: 'EG' },
      { text: 'Sweden', value: 'SE' },
    ],
    userInput: {
      name: '',
      gender: '',
      dob: {
        day: '',
        month: '',
        year: '',
      },
      country: '',
      phoneNumber: '',
      incorrect: false,
    },
    validation,
  }),
  methods: {
    /**
     * Submits input and edits the user's profile
     * @todo[XL3] Implement this after reaching out to backend
     */
    async submit() {
      if (!this.$refs.editProfileForm.validate()) return;

      /**
       * Utility function to format the Date of Birth
       * @param  {Object} dob The object containing the Date of birth
       * @return {String}     The formatted Date of Birth
       */
      const formatDob = (dob) => {
        let { day } = dob;

        if (parseInt(day, 10) < 10) {
          day = `0${day}`;
        }

        return `${dob.year}-${dob.month}-${day}`;
      };

      // Collect edited data
      // @todo[XL3] Add name
      const editedData = {};
      Object.keys(this.userInput).forEach((key) => {
        if (this.userInput[key] !== '' && this.userInput[key] !== 'incorrect') {
          if (key === 'dob') {
            if (this.userInput[key].day && this.userInput[key].month && this.userInput[key].year) {
              editedData.birthdate = formatDob(this.userInput[key]);
            }
          } else {
            editedData[key] = this.userInput[key];
          }
        }
      });

      // Send the request
      const response = await api.editProfile(editedData);

      // If the request was successful,
      // update currentUser,
      // and reroute to AccountOverview
      // 200 OK
      if (response.status === 200) {
        const userProfile = response.data;
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        currentUser.data = userProfile;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        this.$router.push({ name: 'AccountOverview' });
      } else {
        this.userInput.incorrect = true;
      }
    },
  },
};
</script>

<style lang="css" scoped>
a {
  text-decoration: none !important;
}

.spotify-green {
  color: #1DB954 !important;
}
</style>
