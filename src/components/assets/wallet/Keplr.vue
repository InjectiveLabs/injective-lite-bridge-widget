<script setup lang="ts">
const id = Math.random();
const id2 = Math.random();
const id3 = Math.random();
const id4 = Math.random();
</script>

<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g :clip-path="'url(#clip' + id + '_4716_2952)'">
      <path
        d="M24 18.1583V5.84166C24 2.6154 21.3846 0 18.1583 0L5.84166 0C2.6154 0 -1.90735e-06 2.6154 -1.90735e-06 5.84166V18.1583C-1.90735e-06 21.3846 2.6154 24 5.84166 24H18.1583C21.3846 24 24 21.3846 24 18.1583Z"
        :fill="'url(#paint0_linear_' + id + '_2952)'"
      />
      <path
        opacity="0.9"
        d="M24 18.1583V5.84166C24 2.6154 21.3846 0 18.1583 0L5.84166 0C2.6154 0 -1.90735e-06 2.6154 -1.90735e-06 5.84166V18.1583C-1.90735e-06 21.3846 2.6154 24 5.84166 24H18.1583C21.3846 24 24 21.3846 24 18.1583Z"
        :fill="'url(#paint1_linear_' + id2 + '_2952)'"
      />
      <path
        opacity="0.9"
        d="M18.1583 0H5.84166C2.6154 0 0 2.6154 0 5.84166V18.1583C0 21.3846 2.6154 24 5.84166 24H18.1583C21.3846 24 24 21.3846 24 18.1583V5.84166C24 2.6154 21.3846 0 18.1583 0Z"
        :fill="'url(#paint2_linear_' + id3 + '_2952)'"
      />
      <path
        d="M9.76478 18.2675V12.7162L14.9826 18.2675H17.8854V18.1242L11.884 11.803L17.4224 5.80405V5.73242H14.5018L9.76478 11.033V5.73242H7.41406V18.2675H9.76478Z"
        :fill="'url(#paint3_linear_' + id4 + '_2952)'"
      />
    </g>
    <defs>
      <linearGradient
        :id="'paint0_linear_' + id + '_2952'"
        x1="24.8408"
        y1="13.1846"
        x2="-2.67514"
        y2="-0.726114"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset="0.210712"
          stop-color="#457CD6"
        />
        <stop
          offset="0.681753"
          stop-color="#58ADE9"
        />
        <stop
          offset="0.943139"
          stop-color="#71C4FF"
        />
      </linearGradient>
      <linearGradient
        :id="'paint1_linear_' + id2 + '_2952'"
        x1="10.2803"
        y1="0.993628"
        x2="2.82803"
        y2="21.4777"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#457CD6"
          stop-opacity="0"
        />
        <stop
          offset="0.286458"
          stop-color="#58ADE9"
          stop-opacity="0"
        />
        <stop
          offset="0.570545"
          stop-color="#AF75EA"
          stop-opacity="0.3"
        />
        <stop
          offset="1"
          stop-color="#8557E8"
          stop-opacity="0.8"
        />
      </linearGradient>
      <linearGradient
        :id="'paint2_linear_' + id3 + '_2952'"
        x1="-1.16088e-06"
        y1="-0.496814"
        x2="24"
        y2="23.121"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset="0.0688789"
          stop-color="#457CD6"
          stop-opacity="0"
        />
        <stop
          offset="0.286458"
          stop-color="#58ADE9"
          stop-opacity="0"
        />
        <stop
          offset="0.466157"
          stop-color="#B594FB"
          stop-opacity="0"
        />
        <stop
          offset="0.634398"
          stop-color="#D483FB"
          stop-opacity="0.2"
        />
        <stop
          offset="0.899464"
          stop-color="#BE6CFF"
          stop-opacity="0.8"
        />
        <stop
          offset="1"
          stop-color="#B969F8"
          stop-opacity="0.85"
        />
      </linearGradient>
      <linearGradient
        :id="'paint3_linear_' + id4 + '_2952'"
        x1="12.6497"
        y1="5.73242"
        x2="12.6497"
        y2="18.2675"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" />
      </linearGradient>
      <clipPath :id="'clip' + id + '_4716_2952'">
        <rect
          width="24"
          height="24"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
</template>
