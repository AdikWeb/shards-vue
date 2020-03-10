<template>

	<div class="main-wrapper">
		<d-container>
			<d-form>
				<d-row>
					<d-col cols="12">
						<d-checkbox
								v-model="registration_data.legal_actual"
								:value=true
						>Фактичесий адрес совпадает с юридическим
						</d-checkbox>
					</d-col>
					<d-col cols="12" md="6">
						<div class="cols-content__white__border">
							<div class="form__title__small">Юридический адрес</div>

							<div class="input__block">
								<label>Страна</label>
								<d-form-select v-model="registration_data.legal_data.legal_country_address" :options="this.locations.countrys">
									<option :value=null>None</option>
								</d-form-select>
							</div>
							<div class="input__block">
								<label>Адрес юридический</label>
								<d-input placeholder="пример: с.Жердынбиржерово" v-model="registration_data.legal_data.legal_address"/>
							</div>

							<d-row>
								<d-col md="4">
									<div class="input__block">
										<label>Область</label>
										<d-form-select v-model="registration_data.legal_data.legal_regions_address" :options="this.locationTree(this.locations.regions,registration_data.legal_data.legal_country_address)">
											<option :value=null>None</option>
										</d-form-select>
									</div>
								</d-col>

								<d-col md="5">
									<div class="input__block">
										<label>Населенный пункт</label>
										<d-form-select v-model="registration_data.legal_data.legal_locality_address" :options="this.locationTree(this.locations.locality,registration_data.legal_data.legal_regions_address)">
											<option :value=null>None</option>
										</d-form-select>
									</div>
								</d-col>

								<d-col md="3">
									<div class="input__block">
										<label>Индекс</label>
										<d-input v-model="registration_data.legal_data.legal_post_index"/>
									</div>
								</d-col>
							</d-row>
						</div>
					</d-col>

					<d-col cols="12" md="6">
						<div class="cols-content__white__border">
							<div class="form__title__small">Фактический адрес</div>

							<div class="input__block">
								<label>Страна</label>
								<d-form-select :disabled="registration_data.legal_actual" v-model="registration_data.actual_data.actual_country_address" :options="this.locations.countrys">
									<option :value=null>None</option>
								</d-form-select>
							</div>
							<div class="input__block">
								<label>Адрес фактический</label>
								<d-input :disabled="registration_data.legal_actual" placeholder="пример: с.Жердынбиржерово" v-model="registration_data.actual_data.actual_address"/>
							</div>

							<d-row>
								<d-col md="4">
									<div class="input__block">
										<label>Область</label>
										<d-form-select :disabled="registration_data.legal_actual" v-model="registration_data.actual_data.actual_regions_address" :options="this.locationTree(this.locations.regions,registration_data.actual_data.actual_country_address)">
											<option :value=null>None</option>
										</d-form-select>
									</div>
								</d-col>

								<d-col md="5">
									<div class="input__block">
										<label>Населенный пункт</label>
										<d-form-select :disabled="registration_data.legal_actual" v-model="registration_data.actual_data.actual_locality_address" :options="this.locationTree(this.locations.locality,registration_data.actual_data.actual_regions_address)">
											<option :value=null>None</option>
										</d-form-select>
									</div>
								</d-col>

								<d-col md="3">
									<div class="input__block">
										<label>Индекс</label>
										<d-input :disabled="registration_data.legal_actual" v-model="registration_data.actual_data.actual_post_index"/>
									</div>
								</d-col>
							</d-row>


						</div>
					</d-col>
				</d-row>
				<d-row>
					<d-col>
						<div class="input__block">
							<label>Комментарий</label>
							<d-textarea v-model="registration_data.comment"></d-textarea>
						</div>
					</d-col>
				</d-row>
				<d-row>
					<d-col style="text-align: right;">
						<div class="g-btns">
							<d-button v-show="!this.$parent.editMode" @click.prevent="addAddress" theme="success">Добавить</d-button>
							<d-button v-show="this.$parent.editMode" @click.prevent="updateAddress" theme="success">Сохранить</d-button>
							<d-button v-show="this.$parent.editMode" @click.prevent="$parent.editMode = false;registration_data.id = '';" theme="danger">Отменить</d-button>
						</div>
					</d-col>
				</d-row>
			</d-form>
		</d-container>
	</div>
</template>

<style>

	.g-btns > *{
		margin: 0 5px;
	}
	.main-wrapper {
		padding: 12px;
		padding-top: 100px;
	}

	.input__block {
		margin-bottom: 20px;
	}

	.cols-content__white__border {
		background: #fff;
		border: 1px solid #e3e3e3;
		border-radius: 5px;
		padding: 10px;
		margin-bottom: 15px;
	}

	.form__title__small {
		font-weight: 600;
		margin-bottom: 10px;
	}

	label {
		text-align: left;
	}
</style>

<script>
    import axios from "axios";

    export default {
        name: "addAddressForm",
        props: ["locations"],
        data: function () {
            return {
                registration_data: {
                    id: '',
                    legal_actual: false,
                    comment: '',
                    "actual_data": {
                        "actual_country_address": null,
                        "actual_regions_address": null,
                        "actual_locality_address": null,
                        "actual_address": "",
                        "actual_post_index": ""
                    },
                    "legal_data": {
                        "legal_country_address": null,
                        "legal_regions_address": null,
                        "legal_locality_address": null,
                        "legal_address": "",
                        "legal_post_index": ""
                    },
                }
            };
        },
        mounted: function () {
            this.load();
        },
        methods: {
            addAddress: function () {
                axios.post(window.linkjsonserver+'/addresses/', this.registration_data).then(() =>  {
                    this.load();
                })
            },
            updateAddress:function(){
                return axios.put(window.linkjsonserver+'/addresses/' + this.$parent.idElement , this.registration_data).then(() => {
                    this.load();
                    this.$parent.editMode = false
                    this.registration_data.id = ''
                }).catch((err) => {
                    console.log(err);

                })
            },
            load: function () {
                axios.get(window.linkjsonserver+'/addresses').then(res => {
                    this.$parent.$refs.showAddressBlocks.registration_data = res.data;
                }).catch((err) => {
                    console.log(err);
                })
            },
            locationTree: function (array, id) {
                if (typeof array === "object") {
                    if (array[id] !== "undefined") {
                        return array[id];
                    }
                }
            },
        }
    };
</script>