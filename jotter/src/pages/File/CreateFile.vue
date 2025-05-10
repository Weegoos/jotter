<template>
  <div>
    <BaseQEditor @saveWork="saveWork" @sendWork="sendWork"/>
  </div>
</template>

<script setup>
import BaseQEditor from "../../components/atoms/BaseQEditor.vue";

const saveWork = (data) => {
  console.log(data);
};
</script>

<style>

</style>
