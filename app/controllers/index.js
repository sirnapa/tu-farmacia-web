import Ember from 'ember';

export default Ember.Controller.extend({
    lat: -25.3229494,
    lng: -57.5234882,
    zoom: 16,
    markers: [
        {
            location: [-25.3214972,-57.522627],
            title: 'Maxi Farma',
            content: [
                'Mcal Lopez y Rio Paraguay',
                'Fernando de la Mora',
                '(021) 674 720'
            ]
        },
        {
            location: [-25.3207281,-57.5233726],
            title: 'Punto Farma',
            content: [
                'Mcal Lopez y Cnel Vicente Machuca',
                'Fernando de la Mora',
                'puntofarma.com.py',
                '(021) 674 720'
            ]
        }
    ]
});
