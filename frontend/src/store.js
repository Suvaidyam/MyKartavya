import { reactive, ref } from 'vue';

const filters = ref({
    sdgs: [],
    volunteering_hours: '',
    activity_type: [],
    karma_points: ''
});
export const store = reactive({
    filters: filters.value
});