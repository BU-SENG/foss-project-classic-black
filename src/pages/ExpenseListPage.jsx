// src/pages/ExpenseListPage.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ExpenseItem from "../components/expense/ExpenseItem";
import { api } from "../utils/api";

export default function ExpenseListPage() {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const categories = api.getCategories();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await api.getExpenses();
        setExpenses(data);

        const params = new URLSearchParams(location.search);
        const cat = params.get("category");
        if (cat) setFilterCategory(cat);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [location.search]);

  // const filtered = expenses.filter((exp) => {
  //   const matchesSearch =
  //     exp.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     exp.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     exp.amount.toString().includes(searchTerm);

  //   const matchesCategory = !filterCategory || exp.category === filterCategory;
  //   const matchesDate = !filterDate || exp.date === filterDate;

  //   return matchesSearch && matchesCategory && matchesDate;
  // });

  const reloadExpenses = async () => {
    const data = await api.getExpenses();
    setExpenses(data);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterCategory("");
    setFilterDate("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#2d2d2eff",
        padding: "2rem",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "black",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          padding: "1rem 2rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#fcfcfdff",
            }}
          >
            Expenses
          </h1>
          <Link
            to="/add"
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#2563eb",
              color: "white",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
              fontWeight: "500",
              textDecoration: "none",
            }}
          >
            ➕ Add
          </Link>
        </div>
      </header>

      {/* Filters */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        

        {/* Results */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {
            loading ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  color: "#6b7280",
                }}
              >
                Loading expenses...
              </div>
            ) : expenses.map((expense)=>{
              return<div>
                <div>{expense.title}</div>
                <div>{expense.amount}</div>
                <div>{expense.category}</div>
              </div>
            })
            // ) : filtered.length === 0 ? (
            //   <div
            //     style={{
            //       backgroundColor: "white",
            //       borderRadius: "0.375rem",
            //       boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            //       padding: "2rem",
            //       textAlign: "center",
            //     }}>
            //     <p style={{ color: "#6b7280" }}>
            //       No expenses found.
            //       <Link
            //         to="/add"
            //         style={{
            //           color: "#2563eb",
            //           textDecoration: "underline",
            //           marginLeft: "0.25rem",
            //         }}>
            //         Add one?
            //       </Link>
            //     </p>
            //   </div>
            // ) : (
            // filtered.map((expense) => (
            //   <ExpenseItem
            //     key={expense.id}
            //     expense={expense}
            //     onExpenseChange={reloadExpenses}
            //   />
            // ))
            // null
            // )
          }
        </div>
      </main>
    </div>
  );
}
