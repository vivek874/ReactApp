import { useState } from "react";
import ListGroup from "../components/ListGroup";
import Button from "../components/button";
import Alert from "../components/Alert";

const Home = () => {
    const items = ["abc", "def"];
    const [showAlert, setShowAlert] = useState(false);

    const handleSelectItem = (item: string) => {
        console.log(item);
    };

    const handleSave = () => {
        alert("saved");
    };

    return (
        <div>
            <ListGroup
                items={items}
                heading="Topic"
                onSelectItem={handleSelectItem}
            />
            <Button onClick={handleSave}>save</Button>

            {showAlert && (
                <Alert>
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setShowAlert(false)}
                    ></button>
                    alert
                </Alert>
            )}

            <Button onClick={() => setShowAlert(true)}>click for alert</Button>
        </div>
    );
};

export default Home;
