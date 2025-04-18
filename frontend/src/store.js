import { reactive, ref } from 'vue';

export const store = reactive({
  filters: {
    sdgs: [],
    volunteering_hours: '',
    activity_type: [],
    opportunity_type: [],
    karma_points: '',
    types: [] // this can be same as activity_type if needed
  },
  req_for_approavl: false,
  refresh_step: false
});
