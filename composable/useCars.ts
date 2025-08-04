
    export const useCars = () => {
        const cars = [
            {
                id: 1,
                name: 'Mercedes-Benz G-Class (W463)',
                year: 2021,
                price: 25000,
                mileage: 10000,
                location: 'Mohammed Bin Rashid City, Dubai',
                condition: 'New',
                leasing: 12000,
                images: [
                    { id: 1, image: '/images/car-1.png', alt: 'car-1' },
                    { id: 2, image: '/images/car-2.png', alt: 'car-2' },
                    { id: 3, image: '/images/car-3.png', alt: 'car-3' }
                ],
            },
            {
                id: 2,
                name: 'Mercedes-Benz S-Class (W223)',
                year: 2020,
                price: 52000,
                mileage: 19500,
                location: 'Mohammed Bin Rashid City, Dubai',
                condition: 'New',
                leasing: 12000,
                images: [
                    { id: 1, image: '/images/car-1.png', alt: 'car-1' },
                    { id: 2, image: '/images/car-2.png', alt: 'car-2' },
                    { id: 3, image: '/images/car-3.png', alt: 'car-3' }
                ],
            },
            {
                id: 3,
                name: 'Mercedes-Benz E-Class (W213)',
                year: 2022,
                price: 45000,
                mileage: 12000,
                location: 'Mohammed Bin Rashid City, Dubai',
                condition: 'New',
                leasing: 12000,
                images: [
                    { id: 1, image: '/images/car-1.png', alt: 'car-1' },
                    { id: 2, image: '/images/car-2.png', alt: 'car-2' },
                    { id: 3, image: '/images/car-3.png', alt: 'car-3' }
                ],
            },
            {
                id: 4,
                name: 'Mercedes-Benz C-Class (W206)',
                year: 2021,
                price: 38000,
                mileage: 22000,
                location: 'Mohammed Bin Rashid City, Dubai',
                condition: 'New',
                leasing: 122000,
                images: [
                    { id: 1, image: '/images/car-1.png', alt: 'car-1' },
                    { id: 2, image: '/images/car-2.png', alt: 'car-2' },
                    { id: 3, image: '/images/car-3.png', alt: 'car-3' }
                ],
            },
            {
                id: 5,
                name: 'Mercedes-Benz GLE-Class (W167)',
                year: 2023,
                price: 28000,
                mileage: 8500,
                location: 'Mohammed Bin Rashid City, Dubai',
                condition: 'New',
                leasing: 2000,
                images: [
                    { id: 1, image: '/images/car-1.png', alt: 'car-1' },
                    { id: 2, image: '/images/car-2.png', alt: 'car-2' },
                    { id: 3, image: '/images/car-3.png', alt: 'car-3' }
                ],
            },
            {
                id: 6,
                name: 'Mercedes-Benz GLC-Class (X254)',
                year: 2020,
                price: 35000,
                mileage: 31000,
                location: 'Mohammed Bin Rashid City, Dubai',
                condition: 'New',
                leasing: 12000,
                images: [
                    { id: 1, image: '/images/car-1.png', alt: 'car-1' },
                    { id: 2, image: '/images/car-2.png', alt: 'car-2' },
                    { id: 3, image: '/images/car-3.png', alt: 'car-3' }
                ],
            },
            {
                id: 7,
                name: 'Mercedes-Benz A-Class (W177)',
                year: 2022,
                price: 42000,
                mileage: 15000,
                location: 'Mohammed Bin Rashid City, Dubai',
                condition: 'New',
                leasing: 12000,
                images: [
                    { id: 1, image: '/images/car-1.png', alt: 'car-1' },
                    { id: 2, image: '/images/car-2.png', alt: 'car-2' },
                    { id: 3, image: '/images/car-3.png', alt: 'car-3' }
                ],
            },
            {
                id: 8,
                name: 'Mercedes-Benz CLS-Class (C257)',
                year: 2021,
                price: 48000,
                mileage: 18500,
                location: 'Mohammed Bin Rashid City, Dubai',
                condition: 'Used',
                leasing: 12000,
                images: [
                    { id: 1, image: '/images/car-1.png', alt: 'car-1' },
                    { id: 2, image: '/images/car-2.png', alt: 'car-2' },
                    { id: 3, image: '/images/car-3.png', alt: 'car-3' }
                ],
            }
        ]

        const getCarById = (id) => {
            return cars.find(car => car.id === parseInt(id))
        }

        return { cars, getCarById }
    }