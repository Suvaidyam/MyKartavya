import { reactive, ref } from 'vue';

const filters = ref({
    sdgs: [],
    volunteering_hours: '',
    activity_type: [],
    karma_points: ''
});
const req_for_approavl = ref(false)
const refresh_step = ref(false);
export const store = reactive({
    filters: filters.value,
    refresh_step: refresh_step.value,
    req_for_approavl: req_for_approavl.value
});