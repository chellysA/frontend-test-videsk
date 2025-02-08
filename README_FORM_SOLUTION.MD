# Resolución lógica del Formulario de direcciones

Esta documentación describe la estructura y funcionamiento del formulario que gestiona la entrada de datos según el país seleccionado y la información de la ciudad basada en el código postal.

## 1. Definición de Constantes

### Constante de información de Países

La constante debe contener la información según el país, deberá tener la siguiente estructura:

```
	 interface ICountryData {
			 country: EnumCountries;
			 fields: [
				 {
					 type: "text" | "select" | "textarea";
					 label: string;
					 options?: { label: string; value: string }[] // Solo si el tipo es "select"
				 }
			];
			 schemaValidation: (values) => unknown
	 };
```

**NOTA:** el schemaValidation debería indicar cuales fields no cumplen con la validación

### Constante de Ciudades

Contiene la información de las ciudades basada en el código postal puede tener la siguiente estructura:

```

	interface ICityData {
		postalCode: string;
		city: string;
		state: string;
		country: string;
		...
	};

```

**NOTA:** Estas constantes pueden ser obtenidas a través de una consulta en caso de que exista un endpoint disponible.

## 2. FormController

El FormController se encargará de gestionar los valores, estados y mensajes de error de cada input subscrito.

- Debe referenciar los valores de cada field subscrito.
- Debe referenciar los mensajes de error para cada field si aplica.
- Debe proporcionar una función para manejar el evento onSubmit, que seguirá la siguiente lógica:
  - Recibir como parámetro un callback que contenga la lógica del
    onSubmit.
  - Disparar la validación de los campos basándose en el esquema  
    definido.
  - Si los campos son válidos, llamar al callback.
  - Si los campos son inválidos, agregar mensajes de error en la referencia  
    correspondiente.

## FormRender

El FormRender se encargará de:

- Renderizar un Input select con los países disponibles.
- Al seleccionar un país, realizar las siguientes acciones:

  - Filtrar la información según el país seleccionado en la constante
    definida con la interface `ICountryData`.
  - Indicar al FormController, a través de un método expuesto, cuál es el
    esquema de validación correspondiente.
  - Renderizar los campos correspondientes extraídos de la constante definida con la interface `ICountryData` accediendo al key `fields`.
  - Definir una variable con un observable al valor del campo de código
    postal para que, cuando sea llenado, se agregue la información de la
    ciudad.

## Inputs Components

Construir los siguientes inputs:

- InputText
- Select
- Textarea
- Entre otros

Los inputs deben:

- Suscribirse al contexto del formulario para obtener los valores, los mensajes de error y métodos para actualizar los valores ingresados.

- Permitir mostrar label, placeholder y mensaje de error.
- Recibir estado del campo es decir si es valido o invalido

- Permitir mostrar y seleccionar opciones en caso de que aplique (select, checkbox y radios).

## Comunicación entre Componentes

La comunicación entre los componentes será centralizada en el FormController, asegurando que todos las referencias (variables) sean leídas y actualizadas a través de métodos, obteniendo así consistencia.

## Posibles Errores

Para evitar que en cada cambio del campo de código postal se accione una búsqueda, se implementará un debounce que permitirá realizar la búsqueda después de un cierto tiempo que el usuario termine de escribir.
