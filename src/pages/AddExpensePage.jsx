import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";

export default function AddExpensePage() {
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const categories = api.getCategories();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Amount must be a positive number");
      return;
    }
    if (!category) {
      setError("Please select a category");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.addExpense({
        title,
        amount: numAmount,
        category,
        date,
        notes,
      });
      navigate("/dashboard", {
        state: { message: "Expense added successfully!" },
      });
    } catch (err) {
      setError("Failed to save expense. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#353636ff",
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
          <button
            onClick={() => navigate(-1)}
            style={{
              fontSize: "0.875rem",
              color: "#fefeffff",
              background: "black",
              border: "none",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            ← Back
          </button>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              background: "black",
              color: "#fafbfdff",
            }}
          >
            Add Expense
          </h1>
          <div style={{ width: "100px" }}></div> {/* spacer */}
        </div>
      </header>

      {/* Form */}
      <main
        style={{
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "white",
            borderRadius: "0.375rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            padding: "2rem",
          }}
        >
          {/* title */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.25rem",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
              }}
              required
            />
          </div>
          {/* Amount */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.25rem",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
              }}
              placeholder="0.00"
              min="0.01"
              required
            />
          </div>

          {/* Category */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.25rem",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
              }}
              required
            >
              <option value="">— Select a category —</option>
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  style={{ textTransform: "lowercase" }}
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.25rem",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
              }}
              required
            />
          </div>

          {/* Notes */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.25rem",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
              }}
              placeholder="e.g. Lunch with friends, bus ticket..."
            />
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                padding: "0.5rem",
                backgroundColor: "#fee2e2",
                color: "#dc2626",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                marginBottom: "1rem",
              }}
            >
              ❌ {error}
            </div>
          )}

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              paddingTop: "1rem",
            }}
          >
            <button
              type="button"
              onClick={() => navigate(-1)}
              style={{
                flex: 1,
                padding: "0.5rem 1rem",
                backgroundColor: "#e5e7eb",
                color: "#111827",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                flex: 1,
                padding: "0.5rem 1rem",
                backgroundColor: isSubmitting ? "#9ca3af" : "#2563eb",
                color: "white",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting ? "Saving..." : "Save Expense"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
