
import { mapGetters, mapActions } from 'vuex'

export const ebookMixin = {
    computed: {
        ...mapGetters([
            'menuVisible',
            'fileName'
        ])
    },
    methods: {
        ...mapActions([
            'setMenuVisible',
            'setFileName'
        ]),
    }
}