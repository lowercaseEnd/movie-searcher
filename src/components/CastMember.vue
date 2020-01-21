<template>
  <li class="cast-list__item">
    <!-- <table>
      <tbody>
        <tr>
          <td class="photo">
            
          </td>
          <td class="name">
            
          </td>
          <td class="character">
            
          </td>
        </tr>
      </tbody>
    </table> -->
    <div class="real-info">
      <img class="cast-list__member-photo" v-bind:src="image" />
      <p class="cast-list__member-name">{{ castMember.name }}</p>
    </div>
    <p class="cast-list__member-character">
              {{ castMember.character }}
            </p>
  </li>
</template>

<script>
  import { mapState, mapGetters } from "vuex";

  export default {
    props: {
      castMember: {
        type: Object
      }
    },
    data() {
      return {
        profilePic: ""
      };
    },
    methods: {
      ...mapGetters(["getConfig"])
    },
    computed: {
      image() {
        // let config = JSON.parse(localStorage.getItem("config"));
        let config = this.getConfig();
        return (
          config.secure_base_url +
          config.backdrop_sizes[0] +
          this.castMember.profile_path
        );
      }
    }
  };
</script>

<style>
.cast-list__member-photo {
  display: none;
}
  .photo {
    /* width: 100px; */
    /* height: 100px; */
  }
  
  .cast-list__member-name,
  .cast-list__member-character {
    display: inline-block;
  }
  @media (min-width: 831px) {
    .cast-list__member-photo {
      display: inline-block;
    }
    .cast-list__member-photo {
    width: 100px;
    height: 100px;
  }
  }
  .cast-list__item {
    display: flex;
    width: 300px;
    justify-content: space-evenly;
  }
</style>
