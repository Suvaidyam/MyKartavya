import { reactive } from 'vue';

export const store = reactive({
  filters: {
    sdgs: [],
    types: [],
    volunteering_hours: '',
    karma_points: '',
    // activity_type: [],
    // opportunity_type: []
  },
  req_for_approavl: false,
  refresh_step: false,
});
