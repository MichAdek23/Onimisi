import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { getDocs, query } from 'firebase/firestore';
import { doc, getDoc,deleteDoc,updateDoc } from 'firebase/firestore';

// Function to add product to Firestore
export const addProduct = async (productData) => {
  try {
    // Adding the product to the 'products' collection
    const product = { ...productData, createdAt: new Date() }; // Adding timestamp
    await addDoc(collection(db, 'products'), product); // Firestore add document
  } catch (error) {
    console.error("Error adding product: ", error);
    throw new Error("Failed to add product.");
  }
};

// Function to retrieve all products from Firestore
export const getProducts = async () => {
  try {
    const q = query(collection(db, 'products'));
    const querySnapshot = await getDocs(q);
    
    // Extract product data and return it
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw new Error("Failed to fetch products.");
  }
};

// Function to retrieve a specific product by its ID
export const getProductById = async (productId) => {
  try {
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);
    
    // Check if product exists
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }; // Return product data
    } else {
      throw new Error("Product not found.");
    }
  } catch (error) {
    console.error("Error fetching product: ", error);
    throw new Error("Failed to fetch product details.");
  }
};


// Function to update product details in Firestore
export const updateProduct = async (productId, updatedData) => {
  try {
    const productRef = doc(db, 'products', productId); // Reference to the product
    await updateDoc(productRef, updatedData); // Update product in Firestore
  } catch (error) {
    console.error("Error updating product: ", error);
    throw new Error("Failed to update product.");
  }
};

// Function to delete a product
export const deleteProduct = async (productId) => {
  try {
    const productRef = doc(db, 'products', productId); // Reference to the product
    await deleteDoc(productRef); // Delete the product from Firestore
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw new Error("Failed to delete product.");
  }
};


