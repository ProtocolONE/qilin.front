<template>
<button
    :class="buttonClasses"
    v-bind="{ disabled, type }"
    @click="emitClick"
>{{text}}</button>
</template>

<script lang="ts">
import { includes } from 'lodash';
import Vue from 'vue';

export default Vue.extend({
    props: {
        disabled: {
            default: false,
            type: Boolean,
        },
        text: {
            default: '',
            type: String,
        },
        color: {
            default: 'blue',
            type: String,
            validator(value: string) {
                return includes(['blue'], value);
            },
        },
        size: {
            default: 'default',
            type: String,
            validator(value: string) {
                return includes(['default'], value);
            },
        },
        type: {
            default: 'button',
            type: String,
            validator(value: string) {
                return includes(['button'], value);
            },
        },
    },
    computed: {
        /** Classes for button */
        buttonClasses(): Array<string> {
            return [
                /**
                 * We need unique classes for root elements in our components
                 * because root elements debends on parent's style scope
                 */
                'base-button',
                ...[this.color, this.size, this.type].map(value => `_${value}`),
            ];
        },
    },
    methods: {
        emitClick(event: Object) {
            // If button has disabled we shoudn't send events
            if (this.disabled) {
                return;
            }

            this.$emit('click', event);
        },
    }
});
</script>

<style scoped lang="scss">
/** @TODO - move to gui consts, fix color and typographics consts */
$button-color: #2f6ecd;
$button-font-color: #fff;
$hover-button-color: #3787ff;
$disabled-button-color: #e1e1e1;

$primary-button-size: 14px;
$button-font-style: Roboto;

.base-button {
    background-color: $button-color;
    border-width: 0;
    outline: none;
    border-radius: 20px;
    color: $button-font-color;
    display: inline-block;
    font-size: $primary-button-size;
    font-style: $button-font-style;
    line-height: 40px;
    height: 40px;
    position: relative;
    transition: background-color .2s ease-out, box-shadow .2s ease-out;
    max-width: 100%;
    text-align: center;
    padding: 0 24px;

    &:before {
        bottom: 1px;
        box-shadow: 0 4px 16px rgba($hover-button-color, .85);
        content: '';
        left: 1px;
        position: absolute;
        right: 1px;
        top: 3px;
        transition: opacity .3s;
        pointer-events: none;
        border-radius: 20px;
        opacity: 0;
    }

    &:hover {
        background-color: $hover-button-color;

        &:before {
            opacity: 1;
        }
    }

    &:active {
        background-color: $button-color;
        box-shadow: inset 0px 4px 16px rgba(0, 0, 0, 0.15);
        
        &:before {
            opacity: 0;
        }
    }

    &[disabled] {
        background-color: $disabled-button-color;
        pointer-events: none;
    }
}
</style>
