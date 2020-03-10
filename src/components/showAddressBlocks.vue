<template>
	<div class="wrap-address">
		<d-container>
			<d-row class="addreList">
				<d-col md="6" v-for="(address, index) in registration_data">
					<div class="address_block_content">
						<div class="address_block--title">Фактичесий адрес совпадает с юридическим: {{address.legal_actual?'Да':'Нет'}}
							<b>ID: {{address.id}}</b></div>
						<div class="address_block--readonly">
							<div class="address_block---readonly--toolpanel">
								<button @click="editAddress(address.id)"><i class="fas fa-edit"></i></button>
								<button @click="deleteAddress(index, address.id)"><i class="fas fa-trash-alt"></i>
								</button>
							</div>

							<div class="g-item">
								<small>Страна</small>
								<span>{{address.legal_data.legal_country_address}}</span>
							</div>

							<div class="g-item">
								<small>Область</small>
								<span>{{address.legal_data.legal_regions_address}}</span>
							</div>
							<div class="g-item">
								<small>Населенный пункт</small>
								<span>{{address.legal_data.legal_locality_address}}</span>
							</div>
							<div class="g-item">
								<small>Адрес юридический</small>
								<span>{{address.legal_data.legal_address}}</span>
							</div>

							<div class="g-item">
								<small>Индекс</small>
								<span>{{address.legal_data.legal_post_index}}</span>
							</div>

							<div class="g-item">
								<small>Коментарии</small>
								<span>{{address.comment}}</span>
							</div>
						</div>

					</div>
				</d-col>
			</d-row>
		</d-container>
	</div>
</template>

<style>
	.addreList > * {
		margin-bottom: 25px;
	}

	.wrap-address {
		margin-top: 100px;
	}

	.g-item {
		margin-bottom: 10px;
	}

	.g-item:last-child {
		margin-bottom: 0;
	}

	.g-item > * {
		display: block;
	}

	.g-item span {
		font-weight: 800;
	}

	.address_block---readonly--toolpanel {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: flex;
		left: 0;
		right: 0;
		border: 0;
		background: rgba(255, 255, 255, 0.7607843137254902);
		justify-content: center;
		align-items: center;
		opacity: 0;
		transition: .3s all;
		visibility: hidden;
	}

	.address_block---readonly--toolpanel > button {
		background-color: transparent;
		color: #4d4d4d;
		display: inline-block;
		border: none;
		width: 60px;
		height: 60px;
		font-size: 30px;
		text-align: center;
		transition: .3s all cubic-bezier(1, 0.1, 0, 1.35);
		transform: translateY(150%) scale(0);
		outline: none;
	}

	.address_block_content {
		position: relative;
		height: 100%;
		padding: 15px;
		box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.12156862745098039);
		border-radius: 3px;
	}

	.address_block--readonly:hover .address_block---readonly--toolpanel {
		opacity: 1;
		visibility: visible;
	}

	.address_block--readonly:hover .address_block---readonly--toolpanel > button {
		transform: translateY(0) scale(1);
	}

	.address_block---readonly--toolpanel > button:nth-child(2) {
		color: #fb7171;
		transition-delay: .1s;
	}

	.address_block---readonly--toolpanel > button:nth-child(2):hover {
		color: #ce3b3b;
	}

</style>

<script>
    import axios from "axios";

    export default {
        name: "showAddressBlocks",
        props: ['locations'],
        data: function () {
            return {
                registration_data: '',
            }
        },
        methods: {
            deleteAddress: function (index, id) {
                axios.delete(window.linkjsonserver + '/addresses/' + id).then(() => {
                    this.$parent.$refs.addAddressForm.load()
                    this.registration_data.splice(index, 1)
                })
            },
            editAddress: function (id) {
                var index = this.registration_data.map(function (e) {
                    return e.id;
                }).indexOf(id);
                this.$parent.editMode = true;
                this.$parent.idElement = id;
                this.$parent.$refs.addAddressForm.registration_data = this.registration_data[index]
            },
        }
    };
</script>