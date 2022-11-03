import React, { useState, useEffect } from 'react';
import AddContainer from '../components/MainPage/AddContainer';
import PlusButton from '../components/MainPage/PlusButton';
import Container from '../components/UI/Container';
import Item from '../components/MainPage/Item';
import Summary from '../components/MainPage/Summary';

import styles from './Home.module.css';
import axiosInstance from '../axios';

const Home = (props) => {
  const [meals, setMeals] = useState([]);
  const [products, setProducts] = useState([]);
  const [goalKcal, setGoalCalories] = useState(0);
  const [goalProtein, setGoalProtein] = useState(0);
  const [goalCarbs, setGoalCarbs] = useState(0);
  const [goalFat, setGoalFat] = useState(0);
  const [addProduct, setAddProduct] = useState(false);
  const [addMeal, setAddMeal] = useState(false);
  const [calorieGoal, setCalorieGoal] = useState(0);
  const [proteinGoal, setProteinGoal] = useState(0);
  const [carbsGoal, setCarbsGoal] = useState(0);
  const [fatGoal, setFatGoal] = useState(0);
  const [changeGoal, setChangeGoal] = useState(false);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [addProdToMealDialog, setAddProdToMealDialog] = useState(false);
  const [mealId, setMealId] = useState('');
  const [userProducts, setUserProducts] = useState([]);
  const [userMeals, setUserMeals] = useState([]);

  // refresh meals when product added to meals
  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosInstance.get('/meals/');
      setMeals(result.data);
    };
    fetchData();
  }, [addProdToMealDialog]);

  // sets products from database to state
  useEffect(
    () => {
      const apiUrl = 'http://127.0.0.1:8000/api/products';
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => setProducts(data));
    },
    [addProdToMealDialog],
    [addProduct],
    []
  );

  // sets user goal from database to state
  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:8000/api/calorieGoal';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setCalorieGoal(data[0].goal);
        setProteinGoal(((data[0].protein_percentage * data[0].goal) / 100 / 4).toFixed(0));
        setCarbsGoal(((data[0].carbs_percentage * data[0].goal) / 100 / 4).toFixed(0));
        setFatGoal(((data[0].fat_percentage * data[0].goal) / 100 / 9).toFixed(0));
      });
  }, []);

  // display meals from database
  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:8000/api/meals';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setMeals(data));
  }, []);

  // display user products from database
  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:8000/api/productSumups';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setUserProducts(data));
  }, []);

  // update userproducts when product deleted
  useEffect(
    () => {
      const apiUrl = 'http://127.0.0.1:8000/api/productSumups';
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => setUserProducts(data));
    },
    [addProduct],
    [userProducts]
  );

  const test = () => {
    const apiUrl = 'http://127.0.0.1:8000/api/productSumups';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  // delete userProduct from database
  const deleteUserProduct = (product) => {
    axiosInstance.delete(`/productSumups/${product.id}/`);
    setUserProducts(userProducts.filter((item) => item.id !== product.id));
    setGoalCalories(goalKcal - product.product.kcal);
    setGoalProtein(goalProtein - product.product.protein);
    setGoalCarbs(goalCarbs - product.product.carbs);
    setGoalFat(goalFat - product.product.fat);
  };

  // calculate calories for a meal
  const calculateCalories = (meal, index) => {
    let kcal = 0;
    meals[index].ingredients.forEach((ingredient) => {
      kcal += ingredient.kcal;
    });
    return kcal;
  };

  // calculate protein for a meal
  const calculateProtein = (meal, index) => {
    let protein = 0;
    meals[index].ingredients.forEach((ingredient) => {
      protein += ingredient.protein;
    });
    return protein;
  };

  // calculate carbs for a meal
  const calculateCarbs = (meal, index) => {
    let carbs = 0;
    meals[index].ingredients.forEach((ingredient) => {
      carbs += ingredient.carbs;
    });
    return carbs;
  };

  // calculate fat for a meal
  const calculateFat = (meal, index) => {
    let fat = 0;
    meals[index].ingredients.forEach((ingredient) => {
      fat += ingredient.fat;
    });
    return fat;
  };

  // Makes dialog to add meal appear
  const addMealHandler = () => {
    setAddMeal(true);
    setChangeGoal(false);
  };

  // Makes dialog to add product appear
  const addProductHandler = () => {
    setAddProduct(true);
    summaryHandler();
  };

  // Sets new goal in state and databaase
  const newGoalHandler = (e) => {
    e.preventDefault();
    const calorieGoal = e.target.calorieGoal.value;
    const proteinGoal = e.target.proteinGoal.value;
    const carbsGoal = e.target.carbsGoal.value;
    const fatGoal = e.target.fatGoal.value;
    if (calorieGoal !== '' && proteinGoal !== '' && carbsGoal !== '' && fatGoal !== '' && Number(fatGoal) + Number(proteinGoal) + Number(carbsGoal) === 100) {
      axiosInstance
        .put('calorieGoal/1/', {
          user: 3,
          goal: calorieGoal,
          protein_percentage: proteinGoal,
          carbs_percentage: carbsGoal,
          fat_percentage: fatGoal,
        })
        .then((res) => {
          console.log(res);
          setCalorieGoal(calorieGoal);
        });

      setChangeGoal(false);
    } else {
      alert('Sum of macros must be 100%');
    }
  };

  // Adds a product to database and state
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const kcal = e.target.kcal.value;
    const protein = e.target.protein.value;
    const carbs = e.target.carbs.value;
    const fat = e.target.fat.value;
    const product = {
      name: name,
      kcal: kcal,
      protein: protein,
      carbs: carbs,
      fat: fat,
    };
    axiosInstance
      .post('products/', product)
      .then((res) => {
        setProducts([...products, res.data]);
      })
      .catch((err) => console.log(err));
    setAddProduct(false);
  };

  // deletes a product from database and state
  const deleteProductHandler = (product) => {
    // delete product from database
    axiosInstance
      .delete(`products/${product}/`)
      .then((res) => {
        setProducts(products.filter((item) => item.id !== product));
      })
      .catch((err) => console.log(err));
  };

  // Deletes a meal from database and state
  const deleteMealHandler = (meal) => {
    axiosInstance
      .delete(`meals/${meal}/`)
      .then((res) => {
        setMeals(meals.filter((item) => item.id !== meal));
      })
      .catch((err) => console.log(err));
  };

  // Calculates summary of users added food
  const summaryHandler = () => {
    let kcal = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;
    userProducts.forEach((product) => {
      kcal += Number(product.product.kcal);
      protein += Number(product.product.protein);
      carbs += Number(product.product.carbs);
      fat += Number(product.product.fat);
    });

    setGoalCalories(kcal);
    setGoalProtein(protein);
    setGoalCarbs(carbs);
    setGoalFat(fat);
  };

  useEffect(() => {
    summaryHandler();
  }, [products, addProduct]);

  useEffect(() => {}, [currentProducts]);

  const handleSaveMeal = (e) => {
    e.preventDefault();
    const mealName = e.target.mealName.value;
    const meal = {
      name: mealName,
      ingredients: [],
    };
    axiosInstance
      .post('meals/', meal)
      .then((res) => {})
      .catch((err) => console.log(err));
    setAddMeal(false);
    setMeals([...meals, meal]);
  };

  const handleAddProductToMeal = (e) => {
    setAddProdToMealDialog(false);
    e.preventDefault();
    const name = e.target.mealName.value;
    const kcal = e.target.kcal.value;
    const protein = e.target.protein.value;
    const carbs = e.target.carbs.value;
    const fat = e.target.fat.value;
    const amount = e.target.amount.value;
    const product = {
      product: {
        name: name,
        kcal: kcal,
        protein: protein,
        carbs: carbs,
        fat: fat,
      },
      amount: amount,
      meal: mealId,
    };
    axiosInstance
      .post('mealProducts/', product)
      .then((res) => {})
      .catch((err) => console.log(err));
    setMeals([...meals], {});
  };

  const extraHandler = (mealID) => {
    setAddProdToMealDialog(true);
    setMealId(mealID);
  };

  return (
    <div className={styles.Home}>
      <button onClick={() => test()}>Calculate meal</button>
      {addProduct === false && addMeal === false && (
        <Container>
          {userProducts.map((product, index) => (
            <Item
              onClick={() => deleteUserProduct(product)}
              key={index}
              title={product.product.name}
              kcal={product.product.kcal}
              protein={product.product.protein}
              carbs={product.product.carbs}
              fat={product.product.fat}
            />
          ))}
          <Summary
            totalKcal={goalKcal}
            totalFat={goalFat}
            totalCarbs={goalCarbs}
            totalProtein={goalProtein}
            calorieGoal={calorieGoal}
            proteinGoal={proteinGoal}
            fatGoal={fatGoal}
            carbsGoal={carbsGoal}
          />
          <div className={styles.ButtonContainer}>
            <button onClick={() => setChangeGoal(true)} className={styles.Button}>
              Change goal
            </button>
          </div>
        </Container>
      )}
      {addProduct === true && (
        <Container>
          <form onSubmit={onSubmitHandler}>
            <label className={styles.Label}>Name: </label>
            <input name="name" className={styles.Input} type="text" />
            <br />
            <label className={styles.Label}>Calories: </label>
            <input name="kcal" className={styles.Input} type="number" />
            <br />
            <label className={styles.Label}>Protein: </label>
            <input name="protein" className={styles.Input} type="number" />
            <br />
            <label className={styles.Label}>Carbs: </label>
            <input name="carbs" className={styles.Input} type="number" />
            <br />
            <label className={styles.Label}>Fat: </label>
            <input name="fat" className={styles.Input} type="number" />
            <br />
            <button className={styles.Button} type="submit">
              Add
            </button>
          </form>
        </Container>
      )}
      {addMeal === true && (
        <Container>
          <form onSubmit={handleSaveMeal}>
            <label className={styles.Label}>Name: </label>
            <input name="mealName" className={styles.Input} type="text" />
            <br />
            <button type="submit" className={styles.Button}>
              Save
            </button>
          </form>
        </Container>
      )}
      {changeGoal === false && addMeal === false && (
        <Container>
          <AddContainer title="Add a new product">
            <PlusButton Add="Product" onClick={addProductHandler} />
          </AddContainer>
          {products.map((product, index) => (
            <Item
              name={product.name}
              onClick={() => deleteProductHandler(product.id)}
              key={index}
              title={product.name}
              kcal={product.kcal}
              protein={product.protein}
              carbs={product.carbs}
              fat={product.fat}
            />
          ))}
        </Container>
      )}
      {addProdToMealDialog === true && (
        <Container>
          <form onSubmit={handleAddProductToMeal}>
            <label className={styles.Label}>Name: </label>
            <input name="mealName" className={styles.Input} type="text" />
            <br />
            <label className={styles.Label}>Kcal: </label>
            <input name="kcal" className={styles.Input} type="number" />
            <br />
            <label className={styles.Label}>Protein: </label>
            <input name="protein" className={styles.Input} type="number" />
            <br />
            <label className={styles.Label}>Carbs: </label>
            <input name="carbs" className={styles.Input} type="number" />
            <br />
            <label className={styles.Label}>Fat: </label>
            <input name="fat" className={styles.Input} type="number" />
            <br />
            <label className={styles.Label}>Amount: </label>
            <input name="amount" className={styles.Input} type="number" />
            <br />
            <button type="submit" className={styles.Button}>
              Save
            </button>
          </form>
        </Container>
      )}
      {changeGoal === false && addProduct === false && (
        <Container>
          <AddContainer title="Add a new meal">
            <PlusButton Add="Meal" onClick={addMealHandler} />
          </AddContainer>
          {meals.map((meal, index) => (
            <Item
              mealsTable={true}
              openAddProdToMealDialog={() => extraHandler(meal.id)}
              onClick={() => deleteMealHandler(meal.id)}
              key={index}
              title={meal.name}
              kcal={calculateCalories(meal.id, index)}
              carbs={calculateCarbs(meal.id, index)}
              fat={calculateFat(meal.id, index)}
              protein={calculateProtein(meal.id, index)}
            />
          ))}
        </Container>
      )}

      {changeGoal === true && (
        <Container>
          <form onSubmit={newGoalHandler}>
            <label className={styles.Label}>Calories: </label>
            <input name="calorieGoal" className={styles.Input} type="number" />
            <br />
            <label className={styles.Label}>Protein percentage: </label>
            <input name="proteinGoal" className={styles.Input} type="number" />
            <br />
            <label className={styles.Label}>Carbs percentage: </label>
            <input name="carbsGoal" className={styles.Input} type="number" />
            <br />
            <label className={styles.Label}>Fat percentage: </label>
            <input name="fatGoal" className={styles.Input} type="number" />
            <br />
            <button className={styles.Button} type="submit">
              Change goal
            </button>
            <button className={styles.Button} onClick={() => setChangeGoal(false)}>
              Cancel
            </button>
          </form>
        </Container>
      )}
    </div>
  );
};

export default Home;
