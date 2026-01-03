<?php
date_default_timezone_set("Africa/Lagos");
    class deletes extends Dbh{
        public function delete_item($table, $condition, $id){
            $delete = $this->connectdb()->prepare("DELETE FROM $table WHERE $condition =:$condition");
            $delete->bindValue("$condition", $id);
            $delete->execute();
        }
        //delete rights from basic package
        public function delete_basic($package){
            $delete = $this->connectdb()->prepare("DELETE FROM 'rights' WHERE package != :package");
            $delete->bindValue("package", $package);
            $delete->execute();
        }
        //delete enterprise rights from basic and standard package
        public function delete_enterprise($package){
            $delete = $this->connectdb()->prepare("DELETE FROM 'rights' WHERE package = :package");
            $delete->bindValue("package", $package);
            $delete->execute();
        }
    }

?>